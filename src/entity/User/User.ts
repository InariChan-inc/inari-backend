import { EmailUniqValidator } from "@root/validators/user/EmailUniqValidator";
import { MaxLength, Validate } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, Index, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Team } from "../Team/Team";
import { Roles } from "./Roles";

@Entity()
@ObjectType()
@Unique('my_unique_constraint', ['email'])
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @Column()
    name: string

    @Field(() => String)
    @Column()
    @MaxLength(30)
    email: string

    @Field(() => String)
    @Column()
    passwordHash: string

    @ManyToOne(() => Roles)
    role: Roles;

    @ManyToMany(() => Team)
    @JoinTable()
    teams: Team[]
}