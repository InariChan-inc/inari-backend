import {Agenda, Every, Define} from "@tsed/agenda";
import {Inject} from "@tsed/di";
import {NotFound} from "@tsed/exceptions";
import {Job} from "agenda";
import {ViewDataRepository} from "../../repositories/ViewDataRepository";
import {ViewInformationRepository} from "../../repositories/ViewInformationRepository";

interface ViewEvent {
  animeId: number;
  ip: string;
}

interface AnimeView {
  views: number;
  animeId: number;
}

@Agenda({namespace: "view"})
export class ViewJobService {
  @Inject()
  private viewDataRepository: ViewDataRepository;

  @Inject()
  private viewInformationRepository: ViewInformationRepository;

  @Every("10 seconds", {
    name: "countViewMonth"
  })
  async countViewMonth(job: Job): Promise<void> {
    console.log("Run job: " + job.attrs.name);

    const counts = await this.viewDataRepository
      .createQueryBuilder()
      .select('count("animeId") as views, "animeId"')
      .groupBy('"animeId"')
      .getRawMany<AnimeView>()
      .catch((e) => {
        throw new NotFound(e);
      });

    counts.forEach(async (element) => {
      const date = new Date();

      const viewInformation = await this.viewInformationRepository.findOne({
        animeId: element.animeId,
        dateMonth: date.getFullYear() + "-" + date.getMonth()
      });

      if (viewInformation) {
        element.views = Number(element.views) + Number(viewInformation.views);
      }

      this.viewInformationRepository.save({
        animeId: element.animeId,
        views: element.views,
        dateMonth: date.getFullYear() + "-" + date.getMonth()
      });

      this.viewDataRepository.delete({animeId: element.animeId});
    });
  }

  @Define({
    name: "addView"
  })
  async addView(job: Job<ViewEvent>): Promise<void> {
    const view = await this.viewDataRepository.findOne({...job.attrs.data});

    if (!view) {
      await this.viewDataRepository.save({
        animeId: job.attrs.data?.animeId,
        ip: job.attrs.data?.ip
      });
    }
  }
}
