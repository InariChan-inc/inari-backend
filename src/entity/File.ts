import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Files {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @Column()
    name: string

    @Field(() => String)
    @Column()
    path: string

    @Field(() => Boolean)
    @Column()
    isTmp: boolean
}