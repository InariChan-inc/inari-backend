import {Configuration, Inject} from "@tsed/di";
import {PlatformApplication} from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import "@tsed/ajv";
import "@tsed/typeorm";
import {config, rootDir} from "./config";
import { useContainer } from "class-validator";
import { JWTMidlleware } from "./midlleware/JWTMidlleware";

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  mount: {
    "/rest": [
      `${rootDir}/controllers/**/*.ts`
    ]
  },
  "componentsScan": [
    "${rootDir}/middleware/**/*.ts",
    "${rootDir}/services/**/*.ts",
    "${rootDir}/repositories/**/*.ts",
    "${rootDir}/validators/**/*.ts"
  ],
  exclude: [
    "**/*.spec.ts"
  ]
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit(): void {
    useContainer(this.app.injector, { fallback: true });
    this.app
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }))
      .use(JWTMidlleware);
  }
}
