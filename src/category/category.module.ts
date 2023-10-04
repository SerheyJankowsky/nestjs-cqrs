import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { SubCategoryController } from './sub-category.controller';
import { CreateCategoryHandler } from './commands/handlers/create-category.handler';
import { CategoryRepository } from '@repositorise/repositories';

const CommandHandlers = [CreateCategoryHandler];

@Module({
  controllers: [CategoryController, SubCategoryController],
  providers: [CategoryRepository, ...CommandHandlers],
  imports: [CqrsModule],
})
export class CategoryModule {}
