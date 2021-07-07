// @tsed/cli do not edit
import * as defaultConfig from "./default.config.json";

var db: any;
if (process.env.NODE_ENV == "test") {
  db = {
    username: "test",
    password: "test",
    database: "test"
  };
} else {
  db = {
    username: "inari",
    password: "inari",
    database: "inari"
  };
}

export default [
  {
    name: "default",
    type: "postgres",
    host: "localhost",
    port: 5432,
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
  }
];
