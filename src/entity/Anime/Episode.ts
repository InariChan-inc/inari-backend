import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Anime } from "./Anime";
import { AnimeToTeam } from "./AnimeToTeam";
import { EpisodeToVideoPlayer } from "./EpisodeToVideoPlayer";

@Entity()
@ObjectType()
export class Episode {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    number_episode: number

    @ManyToOne(() => AnimeToTeam, anime => anime.episodes)
    animeToTeam: AnimeToTeam

    @OneToMany(() => EpisodeToVideoPlayer, episodeToPlayer => episodeToPlayer.videoPlayer)
    public episodeToVideoPlayers!: EpisodeToVideoPlayer[];
}