let db: any;
if (process.env.NODE_ENV == "test") {
  db = {
    username: "test",
    password: "test",
    database: "test",
    port: 5446
  };
} else {
  db = {
    username: "inari",
    password: "inari",
    database: "inari",
    port: 5445
  };
}

export default {
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
};
