import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EpisodeToPlayer } from "../Anime/EpisodeToPlayer";

@Entity()
@ObjectType()
export class Player {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => EpisodeToPlayer, playerToEpisodes => playerToEpisodes.episode)
    public playerToEpisodes!: EpisodeToPlayer[];
}