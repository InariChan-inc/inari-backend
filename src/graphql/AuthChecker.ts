import { ContextualizedTypeStats } from "apollo-reporting-protobuf";
import { UserService } from "@root/services/UserService";
import { AuthChecker } from "type-graphql";

export const customAuthChecker: AuthChecker<ContextualizedTypeStats> = (
    { root, args, context, info },
    params,
) => {
    return false;
};