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
@Unique("my_unique_constraint", ["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @MaxLength(30)
  email: string;

  @Column({default: ThemeEnum.LIGHT_THEME})
  theme: ThemeEnum;

  @Column({nullable: true})
  tokenRefresh?: string;

  @Column({nullable: true})
  passwordHash: string;

  @ManyToOne(() => Roles)
  @JoinColumn()
  role: Roles;

  @ManyToMany(() => Team)
  @JoinTable()
  teams: Team[];
}
