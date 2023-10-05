import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { SubCategoryController } from './sub-category.controller';
import { CreateCategoryHandler } from './commands/handlers/create-category.handler';
import {
  CategoryRepository,
  SubCategoryRepository,
} from '@repositorise/repositories';
import { UpdateCategoryHandler } from './commands/handlers/update-category.handler';
import { GetCategoryHandler } from './queries/handlers/get-category.handler';
import { DeleteCategoryHandler } from './commands/handlers/delete-category.handler';

const CommandHandlers = [
  CreateCategoryHandler,
  UpdateCategoryHandler,
  DeleteCategoryHandler,
];
const QueryHandlers = [GetCategoryHandler];

@Module({
  controllers: [CategoryController, SubCategoryController],
  providers: [
    CategoryRepository,
    SubCategoryRepository,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  imports: [CqrsModule],
})
export class CategoryModule {}
