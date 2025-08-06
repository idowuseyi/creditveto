import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';

@Module({
  imports: [],
  controllers: [AiController],
  providers: [],
  exports: [],
})
export class AiModule { }
