import { EntityRepository, Repository } from "typeorm";
import { Permission } from "@root/entity/User/Permission";

@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> {
    
}