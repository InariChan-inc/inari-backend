#!/usr/bin/env node
import {CliCore} from "@tsed/cli-core";
import "@tsed/typeorm";
import {config} from "../config";
import {PermissionComand} from "./PermissionComand";
import { UserComand } from "./UserCommand";

CliCore.bootstrap({
  ...config,
  // add your custom commands here
  commands: [
    PermissionComand,
    UserComand
  ]
}).catch(console.error);