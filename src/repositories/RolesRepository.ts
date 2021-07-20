import {EntityRepository, Repository} from "typeorm";
import {Roles} from "../entity/User/Roles";
@EntityRepository(Roles)
export class RolesRepository extends Repository<Roles> {}
