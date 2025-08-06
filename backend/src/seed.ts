import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { DisputesService } from './disputes/disputes.service';
import { UserRole } from './users/user.entity';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);
  const disputesService = app.get(DisputesService);

  // Create sample users
  const admin = await usersService.create({
    email: 'admin@creditveto.com',
    password: 'adminpass',
    role: UserRole.ADMIN,
  });
  const user = await usersService.create({
    email: 'user@creditveto.com',
    password: 'userpass',
    role: UserRole.USER,
  });

  // Create sample disputes
  await disputesService.createDispute({
    title: 'Incorrect late payment',
    description: 'A late payment was reported in error.',
  }, user);
  await disputesService.createDispute({
    title: 'Fraudulent account',
    description: 'An account I did not open appears on my report.',
  }, user);

  await app.close();
  console.log('Seeding complete.');
}

bootstrap();
