import { DatabaseProvider } from "./database.provider";
import { UserProvider } from "./user.provider";
import { AudienceProvider } from "./audience.provider";
import { PrivateProvider } from "./private.provider";

export const PROVIDERS = [
  DatabaseProvider,
  UserProvider,
  AudienceProvider,
  PrivateProvider
];