import {PermissionAction} from "./PermissionAction";

export class AnimePermissions {
  static get(): PermissionAction[] {
    return [
      new PermissionAction("updateAnime", ["updateAnime"]),
      new PermissionAction("createAnime", ["createAnime"]),
      new PermissionAction("createBaner", ["createBaner"]),
      new PermissionAction("deleteBaner", ["deleteBaner"]),
      new PermissionAction("updateBaner", ["updateBaner"]),
      new PermissionAction("deleteAnime", ["deleteAnime"])
    ];
  }
}
