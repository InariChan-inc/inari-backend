import {EntityRepository, Repository} from "typeorm";
import {ViewsData} from "../entity/Anime/ViewsData";

@EntityRepository(ViewsData)
export class ViewDataRepository extends Repository<ViewsData> {}
