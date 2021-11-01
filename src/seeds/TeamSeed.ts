import {TeamService} from "../services/TeamService";
import * as async from "async";

export class TeamSeed {
  seedData = [
    {
      name: "Inari",
      indef: "inari"
    }
  ];

  constructor(public teamService: TeamService) {}

  async init(): Promise<void> {
    await async.eachOf(this.seedData, async (elem) => {
      await this.teamService.create({
        name: elem.name,
        indef: elem.indef
      });
    });
  }
}
