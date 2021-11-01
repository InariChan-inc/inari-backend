import {EntityRepository, Repository} from "typeorm";
import {Figure} from "../entity/Figure/Figure";
@EntityRepository(Figure)
export class FigureRepository extends Repository<Figure> {}
