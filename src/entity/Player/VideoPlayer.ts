import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EpisodeToVideoPlayer } from "../Anime/EpisodeToVideoPlayer";

@Entity()
@ObjectType()
export class VideoPlayer {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => EpisodeToVideoPlayer, videoPlayerToEpisodes => videoPlayerToEpisodes.episode)
    public videoPlayerToEpisodes!: EpisodeToVideoPlayer[];
}