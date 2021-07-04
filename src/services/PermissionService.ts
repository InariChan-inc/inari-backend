import { Inject, Service } from "@tsed/common";
import { UseConnection } from "@tsed/typeorm";
import { PermissionRepository } from "@root/repositories/PermissionRepository";
import { Permission } from "@root/entity/User/Permission";

@Service()
export class PermissionService {
  @Inject()
  @UseConnection("default")
  permissionRepository: PermissionRepository;

  async create(prm: Permission) {
    return this.permissionRepository.save(prm);
  }

  async findOne(params: any) {
    //return false;
   return this.permissionRepository.findOne(params);
  }
}
