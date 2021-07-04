import { Field, InputType } from "type-graphql"

@InputType()
export class AnimeNameInput {
    @Field()
    ua: string
    
    @Field({ nullable: true })
    ru?: string
    
    @Field({ nullable: true })
    en?: string

    @Field({ nullable: true })
    jp?: string
}