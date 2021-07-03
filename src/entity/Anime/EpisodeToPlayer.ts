import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "../Player/Player";
import { Team } from "../Team/Team";
import { Anime } from "./Anime";
import { Episode } from "./Episode";

@Entity()
@ObjectType()
export class EpisodeToPlayer {
    @PrimaryGeneratedColumn()
    public postToCategoryId!: number;

    @Column()
    public episodeId!: number;

    @Column()
    public playerId!: number;

    @Column()
    public iframe!: string;

    @ManyToOne(() => Episode, episode => episode.episodeToPlayers)
    public episode!: Episode;

    @ManyToOne(() => Player, player => player.playerToEpisodes)
    public player!: Player;
}