import {EntityRepository, Repository} from "typeorm";
import {ViewsInformation} from "../entity/Anime/ViewsInformation";

@EntityRepository(ViewsInformation)
export class ViewInformationRepository extends Repository<ViewsInformation> {}
