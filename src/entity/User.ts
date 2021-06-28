import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @Column()
    name: string

    @Field(() => String)
    @Column()
    email: string

    @Field(() => String)
    @Column()
    password: string

    constructor(user?: User) {
        if (user) {
            this.id = user.id
            this.name = user.name
            this.email = user.email
            this.password = user.password
        }
    }
}