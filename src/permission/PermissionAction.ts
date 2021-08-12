export class PermissionAction {
  key: string;

  resolves: string[];

  constructor(key: string, resolves: string[]) {
    this.key = key;
    this.resolves = resolves;
  }
}
