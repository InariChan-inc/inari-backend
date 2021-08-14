import {Inject, Service} from "@tsed/common";
import {UseConnection} from "@tsed/typeorm";
import {User} from "@root/entity/User/User";
import {UserInput} from "../inputs/User/UserInput";
import {UserLoginInput} from "../inputs/User/UserLoginInput";
import {UserRepository} from "@root/repositories/UserRepository";
import {Passwordhelper} from "@root/helpers/PasswordHelper";
import {FindConditions, FindOneOptions, FindOperator} from "typeorm";
import * as _ from "lodash";
import {JWThelper} from "@root/helpers/JWTHelpers";
import {Token} from "@root/entity/Token";
import {UserData} from "../data/user/UserData";
import {NotFound} from "@tsed/exceptions";
import {plainToClass} from "class-transformer";
import {UserUpdateInput} from "@root/inputs/User/UserUpdateInput";
import {ValidationError} from "apollo-server-express";
@Service()
export class UserService {
  @Inject()
  @UseConnection("default")
  userRepository: UserRepository;

  async validateUser(userLoginInput: UserLoginInput): Promise<User | null> {
    const user = await this.userRepository.findOne({email: userLoginInput.email});
    if (user && (await Passwordhelper.checkPassword(userLoginInput.password, user.passwordHash))) {
      return user;
    }
    return null;
  }

  async validateRefreshToken(tokenRefresh: string): Promise<UserData | null> {
    const userId = await JWThelper.verifyRefreshToken(tokenRefresh);
    const user = await this.findById(userId);

    if (user && user.tokenRefresh === tokenRefresh) {
      return user;
    }

    return null;
  }

  async createNewToken(user: UserData): Promise<Token> {
    const [tokenRefresh, tokenRefreshExp] = JWThelper.createTokenRefresh(user);
    const [token, tokenExp] = JWThelper.createToken(user);
    await this.updateById({id: user.id}, {tokenRefresh});

    return new Token(token, tokenRefresh, tokenExp, tokenRefreshExp);
  }

  async updateById(condition: FindConditions<User>, userInput: Partial<UserUpdateInput>) {
    const id = condition.id!;
    const user = await this.findById(id);

    if (userInput.passwordOld && !(await Passwordhelper.checkPassword(userInput.passwordOld, user.passwordHash))) {
      throw new ValidationError("Старий пароль не вірний");
    }

    let userUpdate = plainToClass(User, {
      ...userInput,
      passwordHash: userInput.passwordNew ? await Passwordhelper.createHash(userInput.passwordNew) : undefined
    });

    userUpdate = _.omit(userUpdate, ["passwordOld", "passwordNew"]) as User;

    return this.userRepository.update(condition, _.pickBy(userUpdate));
  }

  async create(userInput: UserInput) {
    const user = new User();
    user.email = userInput.email;
    user.name = userInput.name;
    user.name = userInput.name;
    user.passwordHash = await Passwordhelper.createHash(userInput.password);
    return this.userRepository.save(user);
  }

  async findById(userId: number | FindOperator<number>) {
    const user = await this.userRepository.findOne({id: userId}, {relations: ["role", "avatar"]});

    if (user === undefined) {
      throw new NotFound("user not found");
    }

    return UserData.loadFromEntity(user);
  }

  async findOne(userInputLogin: UserLoginInput | any, options?: FindOneOptions<User>): Promise<User | undefined> {
    return await this.userRepository.findOne(userInputLogin, options);
  }

  async findAll() {
    return this.userRepository.find();
  }

  // async findById(id: number) {
  //   return this.users.find((item) => item.id === id);
  // }

  // async findAll(options: any) {
  //   console.log(this.users);
  //   return this.users;
  // }
}
