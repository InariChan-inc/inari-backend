import {Field, InputType} from "type-graphql";
import {VideoPlayerInput} from "./VideoPlayerInput";

@InputType()
export class EpisodeInput {
  @Field()
  animeId: number;

  @Field()
  teamId: number;

  @Field()
  name?: string;

  @Field()
  number_episode?: string;

  @Field(() => [VideoPlayerInput])
  videoPlayers: VideoPlayerInput[];
}
