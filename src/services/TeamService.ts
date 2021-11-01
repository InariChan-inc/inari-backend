import {Inject} from "@tsed/di";
import {UseConnection} from "@tsed/typeorm";
import {Team} from "../entity/Team/Team";
import {TeamRepository} from "../repositories/TeamRepository";

export class TeamService {
  @Inject()
  @UseConnection("default")
  teamRepository: TeamRepository;

  async create(team: Partial<Team>): Promise<Team> {
    return this.teamRepository.save(team);
  }
}
