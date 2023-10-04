import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  controllers: [CategoryController],
  providers: [],
  imports: [CqrsModule],
})
export class CategoryModule {}
