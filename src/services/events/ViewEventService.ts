import {Inject, Injectable} from "@tsed/common";
import {OnEvent} from "@tsed/event-emitter";
import {ViewDataRepository} from "../../repositories/ViewDataRepository";

interface ViewEvent {
  animeId: number;
  ip: string;
}

@Injectable()
export class ViewEventService {
  @Inject()
  private viewDataRepository: ViewDataRepository;

  @OnEvent("view.add")
  async addView(event: ViewEvent): Promise<void> {
    const view = await this.viewDataRepository.findOne({...event});

    if (!view) {
      this.viewDataRepository.save({
        animeId: event.animeId,
        ip: event.ip
      });
    }
  }
}
