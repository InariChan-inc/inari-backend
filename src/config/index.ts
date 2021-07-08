import { join } from "path";
import { customAuthChecker } from "@root/graphql/AuthChecker";
import { UserResolve } from "@root/graphql/resolves/UserResolve";
import { loggerConfig } from "./logger";
import typeormConfig from "./typeorm";
import { AnimeResolve } from "@root/graphql/resolves/AnimeResolve";
import "@tsed/typeorm";

var db: any;
if (process.env.NODE_ENV == "test") {
  db = {
    host: "localhost",
    username: "test",
    password: "test",
    database: "test",
    port: 5436,
  };
} else {
  db = {
    host: "localhost",
    username: "inari",
    password: "inari",
    database: "inari",
    port: 5435,
  };
}

const { version } = require("../../package.json");
export const rootDir = join(__dirname, "..");
export const config: Partial<TsED.Configuration> = {
  version,
  rootDir,
  logger: loggerConfig,
  typeorm: [{
    name: "default",
    type: "postgres",
    host: "localhost",
    port: db.port,
    username: db.username,
    password: db.password,
    database: db.database,
    synchronize: true,
    logging: false,
    entities: ["${rootDir}/entity/**/*.{js,ts}"],
    migrations: ["${rootDir}/migration/**/*.{js,ts}"],
    subscribers: ["${rootDir}/subscriber/**/*.{js,ts}"],
    cli: {
      entitiesDir: "${rootDir}/entity",
      migrationsDir: "${rootDir}/migration",
      subscribersDir: "${rootDir}/subscriber"
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
