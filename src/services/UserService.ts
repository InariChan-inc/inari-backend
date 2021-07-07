import {Inject, Injectable, Service} from "@tsed/common";
import {UseConnection} from "@tsed/typeorm";
import {User} from "@root/entity/User/User";
import {UserInput} from "../inputs/User/UserInput";
import {UserLoginInput} from "../inputs/User/UserLoginInput";
import {UserRepository} from "@root/repositories/UserRepository";
import {Passwordhelper} from "@root/helpers/PasswordHelper";
import {FindConditions} from "typeorm";
import {QueryDeepPartialEntity} from "typeorm/query-builder/QueryPartialEntity";
import {JWThelper} from "@root/helpers/JWTHelpers";
import {Token} from "@root/entity/Token";
@Service()
export class UserService {
  @Inject()
  @UseConnection("default")
  userRepository: UserRepository;

  async validateUser(userLoginInput: UserLoginInput): Promise<User | null> {
    let user = await this.userRepository.findOne({email: userLoginInput.email});
    if (user && (await Passwordhelper.checkPassword(userLoginInput.password, user.passwordHash))) {
      return user;
    }
    return null;
  }

  async validateRefreshToken(tokenRefresh: string): Promise<User | null> {
    let userId = await JWThelper.verifyRefreshToken(tokenRefresh);
    let user = await this.findById(userId);

    if (user && user.tokenRefresh === tokenRefresh) {
      return user;
    }

    return null;
  }

  async createNewToken(user: User): Promise<Token> {
    let [tokenRefresh, tokenRefreshExp] = JWThelper.createTokenRefresh(user);
    let [token, tokenExp] = JWThelper.createToken(user);
    this.updateById({id: user.id}, {tokenRefresh});

    return new Token(token, tokenRefresh, tokenExp, tokenRefreshExp);
  }

  async updateById(condition: FindConditions<User>, update: QueryDeepPartialEntity<User>) {
    return this.userRepository.update(condition, update);
  }

  async create(userInput: UserInput) {
    let user = new User();
    user.email = userInput.email;
    user.name = userInput.name;
    user.name = userInput.name;
    user.passwordHash = await Passwordhelper.createHash(userInput.password);
    return this.userRepository.save(user);
  }

  async findById(userId: number) {
    return this.userRepository.findOne(userId);
  }

  async findOne(userInputLogin: UserLoginInput | any): Promise<User | undefined> {
    return await this.userRepository.findOne(userInputLogin);
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
