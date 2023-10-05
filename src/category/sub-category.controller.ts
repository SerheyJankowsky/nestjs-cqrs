import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Auth } from '@guards';
import { CreateSubCategoryContract } from '@contracts/contracts/category/create-sub-category.contract';
import { CreateSubCategoryCommand } from './commands/impl/create-sub-category.command';
import { GetSubCategoryContract } from '@contracts/contracts';
import { GetSubCategoryQuery } from './queries/impl/get-sub-category.command';

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
}
