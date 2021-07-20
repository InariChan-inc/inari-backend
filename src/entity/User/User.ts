import {MaxLength} from "class-validator";
import {Field, ID, ObjectType} from "type-graphql";
import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {Team} from "../Team/Team";
import {Roles} from "./Roles";

export enum ThemeEnum {
  LIGHT_THEME,
  BLACK_THEME
}

@Entity()
@ObjectType()
@Unique("my_unique_constraint", ["email"])
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  @MaxLength(30)
  email: string;

  @Column({default: ThemeEnum.LIGHT_THEME})
  theme: ThemeEnum;

  @Field(() => String, {nullable: true})
  @Column({nullable: true})
  tokenRefresh?: string;

  @Field(() => String)
  @Column()
  passwordHash: string;

  @ManyToOne(() => Roles)
  @JoinColumn()
  role: Roles;

  @ManyToMany(() => Team)
  @JoinTable()
  teams: Team[];
}
