import { Inject, Service } from "@tsed/common";
import { UseConnection } from "@tsed/typeorm";
import { User } from "@root/entity/User";
import { UserInput } from "../inputs/User/UserInput";
import { UserLoginInput } from "../inputs/User/UserLoginInput";
import { UserRepository } from "@root/repositories/UserRepository";
import { Passwordhelper } from "@root/helpers/PasswordHelper";
@Service()
export class UserService {
  @Inject()
  @UseConnection("default")
  userRepository: UserRepository;

  async validateUser(userLoginInput: UserLoginInput): Promise<User | null> {
    let user = await this.userRepository.findOne({ email: userLoginInput.email });
    if (user && await Passwordhelper.checkPassword(userLoginInput.password, user.passwordHash)) {
      return user;
    }
    return null;
  }

  async create(userInput: UserInput) {
    let user = new User;
    user.email = userInput.email;
    user.name = userInput.name;
    user.passwordHash = await Passwordhelper.createHash(userInput.password);
    return this.userRepository.save(user);
  }

  async findById(userId: number) {
    return this.userRepository.findOne(userId);
  }

  async findOne(userInputLogin: UserLoginInput): Promise<User | undefined> {
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
