import { PrivateSchema } from 'src/schemas/private.schema';
import { Connection } from "mongoose";

export const PrivateProvider = {
    provide: 'PRIVATE_MODEL',
    useFactory: (connection: Connection) => connection.model('Private', PrivateSchema),
    inject: ['DATABASE_CONNECTION']
};