import {Injectable} from "@tsed/di";
import * as _ from "lodash";
import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";

@ValidatorConstraint({async: true})
@Injectable()
export class RequiredValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const data = args.object as any;

    if (_.has(args.object, args.constraints[0]) && data[args.constraints[0]] !== undefined) {
      return true;
    }

    return false;
  }
}
