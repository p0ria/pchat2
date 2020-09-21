import { Connection } from "mongoose";
import { AudienceSchema } from "src/schemas/audience.schema";

export const AudienceProvider = {
  provide: 'AUDIENCE_MODEL',
  useFactory: (connection: Connection) => connection.model('Audience', AudienceSchema),
  inject: ['DATABASE_CONNECTION']
};