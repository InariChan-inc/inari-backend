import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Figure } from "../Figure/Figure";
import { Team } from "../Team/Team";
import { Anime } from "./Anime";
import { Episode } from "./Episode";

@Entity()
@ObjectType()
export class AnimeToTeam {
    @PrimaryGeneratedColumn()
    public postToCategoryId!: number;

    @Column()
    public animeId!: number;

    @Column()
    public teamId!: number;

    @OneToMany(() => Episode, episode => episode.animeToTeam)
    public episodes: Episode[]

    @OneToMany(() => Figure, figure => figure.animeToTeam)
    public figures: Figure[]

    @ManyToOne(() => Anime, anime => anime.animeToTeams)
    public anime!: Anime;

    @ManyToOne(() => Team, team => team.teamToAnimes)
    public team!: Team;
}