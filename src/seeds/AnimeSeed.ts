import * as async from "async";
import {StatusAnimeEnum} from "../entity/Anime/Anime";
import {SeasonAnimeEnum} from "../entity/Anime/Anime";
import {FormatAnimeEnum} from "../entity/Anime/Anime";
import {FigureEnum} from "../entity/Figure/Figure";
import {AnimeService} from "../services/AnimeService";

export class AnimeSeed {
  seedData = [
    {
      name: {ua: "Такт опус. Доля"},
      description:
        "Світ повністю змінився після падіння чорного метеорита, який породив жахливих монстрів, званих D2. Ці істоти заборонили музику, так як тільки з її допомогою їх можна було перемогти. Але знайшлися люди, які зважилися протистояти D2. Це виявилися дівчата, які володіють силою музики, а також ті, хто керує ними - диригент.",
      currentCountEpisodes: 1,
      countEpisodes: 12,
      duration: 21,
      format: FormatAnimeEnum.TV,
      imageId: 1,
      season: SeasonAnimeEnum.SUMMER,
      status: StatusAnimeEnum.ONGOING,
      studio: "MadHouse",
      genres: ["Бойовик", "Музичний", "Фентезі"],
      dateRelease: new Date("2021"),
      figures: [
        {
          name: "Dixyd",
          teamId: 1,
          type: FigureEnum.Actors
        }
      ]
    },
    {
      name: {ua: "Убивче кохання"},
      description:
        "Одного разу мисливиця за головами Шато, членкиня організації вбивць, зустріла таємничого мисливця за головами Сона. Вони зіткнулись у бою, але Шато програла і змирилась з поразкою. Проте Сон й далі почав полювати, але не за її голову, а за руку і серце! Отак і почалися стосунки між двома вбивцями!    ",
      currentCountEpisodes: 1,
      countEpisodes: 12,
      duration: 21,
      format: FormatAnimeEnum.TV,
      imageId: 1,
      season: SeasonAnimeEnum.SUMMER,
      status: StatusAnimeEnum.ONGOING,
      studio: "Sunrise",
      genres: ["Детектив", "Комедія"],
      dateRelease: new Date("2021"),
      figures: [
        {
          name: "Dixyd",
          teamId: 1,
          type: FigureEnum.Actors
        }
      ]
    },
    {
      name: {ua: "Найсильніший мудрець непридатної емблеми"},
      description: `У далекому світі жив один мудрець, який досяг успіху у своєму розвитку, прозвали його найсильнішим.
      Для того, щоб стати найсильнішим, він присвятив усе своє життя вивченню всіх магічних та бойових мистецтв.
      Але в процесі розвитку він дійшов дуже жорстокого висновку: Моє тіло не підходить для магічного бою.
      Проте він не здався.
      Він запечатав свою власну душу забороненим мистецтвом та відродився у далекому майбутньому.
      «Якого біса? Магія цього світу так відстає від минулого!»`,
      currentCountEpisodes: 1,
      countEpisodes: 12,
      duration: 21,
      format: FormatAnimeEnum.TV,
      imageId: 1,
      season: SeasonAnimeEnum.SUMMER,
      status: StatusAnimeEnum.ONGOING,
      studio: "Silver link",
      genres: ["Ісекай"],
      dateRelease: new Date("2021"),
      figures: [
        {
          name: "Dixyd",
          teamId: 1,
          type: FigureEnum.Actors
        }
      ]
    }
  ];

  relationData: any;

  constructor(public animeService: AnimeService) {}

  async init(relationData: any = []): Promise<void> {
    await async.eachOf(this.seedData, async (elem, index) => {
      await this.animeService.create({
        ...elem,
        imageId: relationData[index].id
      });
    });
  }
}
