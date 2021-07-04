import { PermissionAction } from "./PermissionAction";

export class AnimePermissions {
    static get(): PermissionAction[] {
        return [
            new PermissionAction("updateAnime", ["updateAnime"]),
            new PermissionAction("createAnime", ["createAnime"]),
            new PermissionAction("deleteAnime", ["deleteAnime"]),
        ];
    }
}