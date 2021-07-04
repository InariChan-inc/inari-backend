import { AnimeInput } from "@root/inputs/Anime/AnimeInput";
import { Field, ID, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Images } from "../Images";
import { Janre } from "../Janre/Janre";
import { Team } from "../Team/Team";
import { User } from "../User/User";
import { AnimeToTeam } from "./AnimeToTeam";
import { Episode } from "./Episode";

export enum FormatAnimeEnum {
    TV,
    FILM,
    ONA,
    OVA,
    SPLESH
}

export enum SeasonAnimeEnum {
    SUMMER,
    FALL,
    SPRING,
    WINTER,
    NO_SEASON
}

export enum StatusAnimeEnum {
    NEW,
    ONGOING,
    COMPLETED
}

@Entity()
@ObjectType()
export class Anime {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToOne(() => Images)
    @JoinColumn()
    poster: Images

    @Column("simple-json")
    name_other: { ua: string, en?: string, ru?: string, jp?: string };

    @Column("text")
    description: string

    @Column()
    current_count_episodes: number

    @Column()
    count_episodes: number

    @OneToMany(() => Janre, janre => janre.animes)
    public janres: Janre[]

    @OneToOne(() => User)
    @JoinColumn({ name: "user_created_id" })
    user: User

    @OneToMany(() => AnimeToTeam, animeToTeam => animeToTeam.team)
    public animeToTeams!: AnimeToTeam[];

    @Column()
    duration: number

    @Column()
    format: FormatAnimeEnum

    @Column()
    season: SeasonAnimeEnum

    @Column()
    status: StatusAnimeEnum

    @Column()
    date_release: Date

    @Column({ nullable: true })
    date_end: Date

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    update_at: Date

    loadFromInput(animeInput: AnimeInput){
        this.description = animeInput.description;
        this.name = animeInput.name.ua;
        this.name_other = animeInput.name;
        this.current_count_episodes = animeInput.count_episodes;
        this.count_episodes = animeInput.count_episodes
        this.duration = animeInput.duration
        this.season = animeInput.season
        this.status = animeInput.status
        this.format = animeInput.format
        this.date_release = animeInput.date_release
    }
}