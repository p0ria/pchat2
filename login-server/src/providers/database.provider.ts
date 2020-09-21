import * as mongoose from 'mongoose';

export const DatabaseProvider =
{
  provide: 'DATABASE_CONNECTION',
  useFactory: (): Promise<typeof mongoose> =>
    mongoose.connect(process.env.DB_URI, {dbName: process.env.DB_NAME})
};