import {EntityRepository, Repository} from "typeorm";
import {Episode} from "@root/entity/Anime/Episode";
@EntityRepository(Episode)
export class EpisodeRepository extends Repository<Episode> {}
