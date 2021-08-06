import {UserService} from "@root/services/UserService";
import {Inject, Injectable} from "@tsed/di";
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions
} from "class-validator";

@ValidatorConstraint({async: true})
@Injectable()
export class EmailUniqValidator implements ValidatorConstraintInterface {
  @Inject(UserService)
  userService: UserService;

  validate(value: any, args: ValidationArguments) {
    return this.userService.findOne({email: value}).then((responce) => {
      if (responce) {
        return false;
      }
      return true;
    });
  }
}
