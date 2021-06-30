import { Inject, Service } from "@tsed/common";
import { UseConnection } from "@tsed/typeorm";
import { User } from "@root/entity/User";
import { UserInput } from "../inputs/User/UserInput";
import { UserLoginInput } from "../inputs/User/UserLoginInput";
import { UserRepository } from "@root/repositories/UserRepository";
@Service()
export class UserService {
  @Inject()
  @UseConnection("default")
  userRepository: UserRepository;

  async create(userInput: UserInput) {
    return this.userRepository.save(userInput);
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
