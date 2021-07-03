import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Anime } from "../Anime/Anime";

@Entity()
@ObjectType()
export class Janre {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => Anime, anime => anime.janres)
    animes: Anime
}