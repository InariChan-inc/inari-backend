import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique} from "typeorm";
import {Images} from "../Images";
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

  @Column({type: "text", nullable: true})
  aboutMe?: string;

  @Column()
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

  @OneToOne(() => Images, {nullable: true})
  @JoinColumn()
  avatar?: Images;

  @ManyToMany(() => Team)
  @JoinTable()
  teams: Team[];
}
