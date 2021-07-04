import { ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { VideoPlayer } from "../Player/VideoPlayer";
import { Episode } from "./Episode";

@Entity()
@ObjectType()
export class EpisodeToVideoPlayer {
    @PrimaryGeneratedColumn()
    public postToCategoryId!: number;

    @Column()
    public episodeId!: number;

    @Column()
    public playerId!: number;

    @Column()
    public iframe!: string;

    @ManyToOne(() => Episode, episode => episode.episodeToVideoPlayers)
    public episode!: Episode;

    @ManyToOne(() => VideoPlayer, player => player.videoPlayerToEpisodes)
    public videoPlayer!: VideoPlayer;
}