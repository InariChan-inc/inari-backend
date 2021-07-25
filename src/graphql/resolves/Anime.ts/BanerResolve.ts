import {BanerData} from "@root/data/anime/BanerData";
import {BanerInput} from "@root/inputs/Anime/BanerInput";
import {BanerService} from "@root/services/BanerService";
import {Inject} from "@tsed/di";
import {ResolverService} from "@tsed/graphql";
import {Arg, Mutation, Query} from "type-graphql";

@ResolverService()
export class BanerResolve {
  @Inject()
  SBaner: BanerService;

  @Mutation(() => BanerData)
  createBaner(@Arg("data") BanerInput: BanerInput) {
    return this.SBaner.create(BanerInput);
  }

  @Query(() => BanerData)
  viewBaner(@Arg("id") id: number) {
    return this.SBaner.view(id);
  }
}
