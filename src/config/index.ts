import { join } from "path";
import { customAuthChecker } from "@root/graphql/AuthChecker";
import { UserResolve } from "@root/graphql/resolves/UserResolve";
import { loggerConfig } from "./logger";
import typeormConfig from "./typeorm";
import { AnimeResolve } from "@root/graphql/resolves/AnimeResolve";
import "@tsed/typeorm";

const { version } = require("../../package.json");
export const rootDir = join(__dirname, "..");
export const config: Partial<TsED.Configuration> = {
  version,
  rootDir,
  logger: loggerConfig,
  typeorm: typeormConfig,
  typegraphql: {
    default: {
      path: "/graphql",
      context: ({ req }) => {
        const context = {
          req
        };
        return context;
      },
      buildSchemaOptions: {
        resolvers: [UserResolve, AnimeResolve],
        authChecker: customAuthChecker,
      },
    }
  }
  // additional shared configuration
};
