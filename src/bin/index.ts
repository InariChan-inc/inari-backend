#!/usr/bin/env node
import {CliCore} from "@tsed/cli-core";
import "@tsed/typeorm";
import {config} from "../config";
import {PermissionComand} from "./PermissionComand";
import {RolesComand} from "./RolesComand";
import {UserComand} from "./UserCommand";
import "reflect-metadata";

CliCore.bootstrap({
  ...config,
  // add your custom commands here
  commands: [PermissionComand, UserComand, RolesComand]
}).catch(console.error);
