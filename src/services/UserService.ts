import { Service } from "@tsed/common";
import { User } from "../entity/User";

@Service()
export class UserService {
  users: User[] = [
    new User({
      id: 1,
      name: "name",
      email: "test@test.ua",
      password: "sdf"
    })
  ];

  async findById(id: number) {
    return this.users.find((item) => item.id === id);
  }

  async findAll(options: any) {
    console.log(this.users);
    return this.users;
  }
}
