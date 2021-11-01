import {Inject, Service} from "@tsed/di";
import {Figure} from "../entity/Figure/Figure";
import {FigureInput} from "../inputs/Anime/FigureInput";
import {FigureRepository} from "../repositories/FigureRepository";

@Service()
export class FigureService {
  @Inject()
  RFigure: FigureRepository;

  async createIfNewElseReturn(figureInput: FigureInput): Promise<Figure> {
    const figure = await this.RFigure.findOne({name: figureInput.name, type: figureInput.type});
    if (figure) {
      return figure;
    }
    return this.RFigure.save({name: figureInput.name, type: figureInput.type});
  }
}
