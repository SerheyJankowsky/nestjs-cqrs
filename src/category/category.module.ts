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
import { CreateSubCategoryHandler } from './commands/handlers/create-sub-category.handler';
import { GetSubCategoryHandler } from './queries/handlers/get-sub-category.handler';
import { GetCategoriesHandler } from './queries/handlers/get-categories.handler';
import { UpdateSubCategoryHandler } from './commands/handlers/update-sub-category.handler';
import { MoveSubCategoryHandler } from './commands/handlers/move-sub-category.handler';
import { DeleteSubCategoryHandler } from './commands/handlers/delete-sub-category.handler';

const CommandHandlers = [
  CreateCategoryHandler,
  UpdateCategoryHandler,
  DeleteCategoryHandler,
  CreateSubCategoryHandler,
  UpdateSubCategoryHandler,
  MoveSubCategoryHandler,
  DeleteSubCategoryHandler,
];
const QueryHandlers = [
  GetCategoryHandler,
  GetSubCategoryHandler,
  GetCategoriesHandler,
];

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
