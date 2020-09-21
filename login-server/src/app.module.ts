import { CONTROLLERS } from './controllers/index';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SERVICES } from './services';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/strategies/constants';
import { STRATEGIES } from './auth/strategies';
import { PROVIDERS } from './providers';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME }
    })
  ],
  controllers: [...CONTROLLERS],
  providers: [...SERVICES, ...STRATEGIES, ...PROVIDERS],
})
export class AppModule {}
