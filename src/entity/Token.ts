import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
export class Token {
    @Field(() => String)
    token: string

    constructor(token: string){
        this.token = token;
    }
}