import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Auth } from '@guards';
import {
  CreateCategoryContract,
  DeleteCategoryContract,
  GetCategoryContract,
  UpdateCategoryContract,
} from '@contracts/contracts';
import { User } from '@decorators';
import { CreateCategoryCommand } from './commands/impl/create-category.command';
import { UpdateCategoryCommand } from './commands/impl/update-category.command';
import { GetCategoryQuery } from './queries/impl/get-category.query';
import { DeleteCategoryCommand } from './commands/impl/delete-category.command';
@Auth()
@Controller('category')
export class CategoryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(GetCategoryContract.topic)
  public async getCategory(
    @Param() params: { id: string },
  ): Promise<GetCategoryContract.Response> {
    const category = await this.queryBus.execute(
      new GetCategoryQuery(params.id),
    );
    return {
      category,
    };
  }

  @Post(CreateCategoryContract.topic)
  public async createCategory(
    @Body() category: CreateCategoryContract.Request,
    @User() user: { id: string },
  ): Promise<CreateCategoryContract.Response> {
    const newCategory = await this.commandBus.execute(
      new CreateCategoryCommand(category, user.id),
    );
    return {
      category: newCategory,
    };
  }
  @Patch(UpdateCategoryContract.topic)
  public async updateCategory(
    @Body() category: UpdateCategoryContract.Request,
    @Param() params: { id: string },
  ): Promise<UpdateCategoryContract.Response> {
    const updatedCategory = await this.commandBus.execute(
      new UpdateCategoryCommand(category, params.id),
    );
    return {
      category: updatedCategory,
    };
  }

  @Delete(DeleteCategoryContract.topic)
  public async deleteCategory(
    @Param() param: { id: string },
  ): Promise<DeleteCategoryContract.Response> {
    const deletedCategory = await this.commandBus.execute(
      new DeleteCategoryCommand(param.id),
    );
    return {
      category: deletedCategory,
    };
  }
}
