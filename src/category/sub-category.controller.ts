import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Auth } from '@guards';
import { CreateSubCategoryContract } from '@contracts/contracts/category/create-sub-category.contract';
import { CreateSubCategoryCommand } from './commands/impl/create-sub-category.command';
import {
  DeleteCategoryContract,
  DeleteSubCategoryContract,
  GetSubCategoryContract,
  MoveSubCategoryContract,
  UpdateSubCategoryContract,
} from '@contracts/contracts';
import { GetSubCategoryQuery } from './queries/impl/get-sub-category.command';
import { UpdateCategoryCommand } from './commands/impl/update-category.command';
import { UpdateSubCategoryCommand } from './commands/impl/update-sub-category.command';
import { MoveSubCategoryCommand } from './commands/impl/move-sub-category.command';
import { DeleteSubCategoryCommand } from './commands/impl/delete-sub-category.command';

@Auth()
@Controller('sub-category')
export class SubCategoryController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get(GetSubCategoryContract.topic)
  public async getSubCategory(
    @Param() params: GetSubCategoryContract.Request,
  ): Promise<GetSubCategoryContract.Response> {
    const subCategory = await this.queryBus.execute(
      new GetSubCategoryQuery(params.id),
    );
    return {
      subCategory,
    };
  }

  @Post(CreateSubCategoryContract.topic)
  public async createSubCategory(
    @Body() subCategory: CreateSubCategoryContract.Request,
  ): Promise<CreateSubCategoryContract.Response> {
    const newSubCategroy = await this.commandBus.execute(
      new CreateSubCategoryCommand(subCategory, subCategory.categoryId),
    );
    return {
      subCategory: newSubCategroy,
    };
  }
  @Post(UpdateSubCategoryContract.topic)
  public async updateSubCategory(
    @Param() params: { id: string },
    @Body() subCategory: UpdateSubCategoryContract.Request,
  ): Promise<UpdateSubCategoryContract.Response> {
    const newSubCategroy = await this.commandBus.execute(
      new UpdateSubCategoryCommand(subCategory, params.id),
    );
    return {
      subCategory: newSubCategroy,
    };
  }
  @Post(MoveSubCategoryContract.topic)
  public async moveSubCategory(
    @Body() data: MoveSubCategoryContract.Request,
    @Param() params: { id: string },
  ): Promise<MoveSubCategoryContract.Response> {
    const movedSubCategory = await this.commandBus.execute(
      new MoveSubCategoryCommand(data.categoryId, params.id),
    );
    return {
      subCategory: movedSubCategory,
    };
  }
  @Delete(DeleteSubCategoryContract.topic)
  public async deleteSubCategory(
    @Param() param: DeleteSubCategoryContract.Request,
  ): Promise<DeleteSubCategoryContract.Response> {
    const deletedSubCategory = await this.commandBus.execute(
      new DeleteSubCategoryCommand(param.id),
    );
    return {
      subCategory: deletedSubCategory,
    };
  }
}
