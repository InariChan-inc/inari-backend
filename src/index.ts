//require('module-alias/register')
import { $log } from "@tsed/common";
import { PlatformExpress } from "@tsed/platform-express";
import { Server } from "./Server";
import { useContainer, Validator } from 'class-validator';

async function bootstrap() {
  try {
    $log.debug("Start server...");
    const platform = await PlatformExpress.bootstrap(Server);
    useContainer(platform.app.injector, { fallback: true });

    await platform.listen();
    $log.debug("Server initialized");
  } catch (er) {
    $log.error(er);
  }
}

bootstrap();


