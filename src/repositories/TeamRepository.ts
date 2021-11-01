import {EntityRepository, Repository} from "typeorm";
import {Team} from "../entity/Team/Team";
@EntityRepository(Team)
export class TeamRepository extends Repository<Team> {}
