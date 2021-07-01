import { Email } from "@tsed/schema";
import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from "typeorm";

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
    @Email()
    email: string

    @Field(() => String)
    @Column()
    passwordHash: string
}