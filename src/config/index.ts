import {join} from "path";
import {customAuthChecker} from "@root/graphql/AuthChecker";
import {UserResolve} from "@root/graphql/resolves/UserResolve";
import {loggerConfig} from "./logger";
import {AnimeResolve} from "@root/graphql/resolves/AnimeResolve";
import "@tsed/typeorm";
import {ImageResolve} from "../graphql/resolves/ImageResolve";
import {BanerResolve} from "@root/graphql/resolves/Anime.ts/BanerResolve";
import {AvatarResolve} from "@root/graphql/resolves/AvatarResolve";

let db: any;
if (process.env.NODE_ENV == "test") {
  db = {
    host: "localhost",
    username: "test",
    password: "test",
    database: "test",
    port: 5436
  };
} else {
  db = {
    host: "localhost",
    username: "inari",
    password: "inari",
    database: "inari",
    port: 5435
  };
}
//${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}
const mongoConnectionString = "mongodb://root:example@localhost:27017/agenda?authSource=admin";

const {version} = require("../../package.json");
export const rootDir = join(__dirname, "..");
export const config: Partial<TsED.Configuration> = {
  version,
  rootDir,
  logger: loggerConfig,
  typeorm: [
    {
      name: "default",
      type: "postgres",
      host: "localhost",
      port: db.port,
      username: db.username,
      password: db.password,
      database: db.database,
      synchronize: false,
      logging: false,
      entities: ["${rootDir}/entity/**/*.{js,ts}"],
      migrations: ["${rootDir}/migration/**/*.{js,ts}"],
      subscribers: ["${rootDir}/subscriber/**/*.{js,ts}"],
      cli: {
        entitiesDir: "${rootDir}/entity",
        migrationsDir: "${rootDir}/migration",
        subscribersDir: "${rootDir}/subscriber"
      }
    }
  ],
  typegraphql: {
    default: {
      path: "/graphql",
      uploads: false,
      context: ({req}) => {
        const context = {
          req,
          user: req?.user
        };
        return context;
      },
      buildSchemaOptions: {
        resolvers: [UserResolve, AnimeResolve, ImageResolve, BanerResolve, AvatarResolve],
        authChecker: customAuthChecker
      }
    }
  },
  agenda: {
    enabled: true, // Enable Agenda jobs for this instance.
    // pass any options that you would normally pass to new Agenda(), e.g.
    db: {
      address: mongoConnectionString
    }
  }
  // additional shared configuration
};
