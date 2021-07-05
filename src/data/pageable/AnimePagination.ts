import { CollectionOf, Default, Generics, Integer, MinLength } from "@tsed/schema";
import { Field, ObjectType } from "type-graphql";
import { AnimeData } from "../anime/AnimeData";
import { Pageable } from "./Pageable";
import PaginatedResponse from "./PaginationResponse";

@ObjectType()
export class AnimePagination extends PaginatedResponse(AnimeData) {

    constructor({ data, total, pageable }: Partial<AnimePagination> & { pageable: Pageable }) {
        super(pageable);
        data && (this.data = data);
        total && (this.total = total);
    }

}