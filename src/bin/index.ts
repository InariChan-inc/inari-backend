#!/usr/bin/env node
import {CliCore} from "@tsed/cli-core";
import {config} from "../config"; // Import your application configuration
import {PermissionComand} from "./PermissionComand";
import "@tsed/typeorm";
import { UserComand } from "./UserCommand";

CliCore.bootstrap({
  ...config,
  // add your custom commands here
  commands: [
    PermissionComand,
    UserComand
  ]
}).catch(console.error);