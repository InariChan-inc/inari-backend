import {Field, ID, ObjectType} from "type-graphql";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
@ObjectType()
export class Permission {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column("simple-array")
  resolves: string[];

  @Column({unique: true})
  key: string;
}
