import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { DisputesModule } from './disputes/disputes.module';
import { CreditProfileModule } from './credit-profile/credit-profile.module';
import { AiModule } from './ai/ai.module';
import { WebsocketModule } from './websocket/websocket.module';
import { Dispute } from './disputes/dispute.entity';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Dispute],
      synchronize: true, // Disable in production
    }),
    UsersModule,
    AuthModule,
    DisputesModule,
    CreditProfileModule,
    AiModule,
    WebsocketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
