import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Images } from "../Images";
import { Janre } from "../Janre/Janre";
import { Team } from "../Team/Team";
import { User } from "../User/User";
import { AnimeToTeam } from "./AnimeToTeam";
import { Episode } from "./Episode";

enum FormatAnimeEnum {
    TV,
    FILM,
    ONA,
    OVA,
    SPLESH
}

enum SeasonAnimeEnum {
    SUMMER,
    FALL,
    SPRING,
    WINTER,
    NO_SEASON
}

enum StatusAnimeEnum {
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
    name_other: { en: string, ru: string };

    @Column("text")
    description: string

    @Column()
    current_count_episodes: number

    @Column()
    count_episodes: number

    @OneToMany(() => Janre, janre => janre.animes)
    public janres: Janre[]

    @OneToOne(() => User)
    @JoinColumn({ name: "user_created_id" } )
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

    @Column({nullable: true})
    date_end: Date

    @Column()
    created_at: Date

    @Column()
    update_at: Date
}