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
  typeorm: [{
    "name": "default",
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "test",
    "password": "test",
    "database": "test",
    "synchronize": true,
    "logging": false,
    "entities": [
      "${rootDir}/entity/**/*.{js,ts}"
    ],
    "migrations": [
      "${rootDir}/migration/**/*.{js,ts}"
    ],
    "subscribers": [
      "${rootDir}/subscriber/**/*.{js,ts}"
    ],
    "cli": {
      "entitiesDir": "${rootDir}/entity",
      "migrationsDir": "${rootDir}/migration",
      "subscribersDir": "${rootDir}/subscriber"
    }
  }],
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
