import { Module } from '@nestjs/common';
import { ThingController } from './thing.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  controllers: [ThingController],
  providers: [],
  imports: [CqrsModule],
})
export class ThingModule {}
