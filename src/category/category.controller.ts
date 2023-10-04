import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Auth } from '@guards';
import { CreateCategoryContract } from '@contracts/contracts';
import { User } from '@decorators';
import { CreateCategoryCommand } from './commands/impl/create-category.command';
@Auth()
@Controller('category')
export class CategoryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post(CreateCategoryContract.topic)
  public async createCategory(
    @Body() category: CreateCategoryContract.Request,
    @User() user: { id: string },
  ) {
    return await this.commandBus.execute(
      new CreateCategoryCommand(category, user.id),
    );
  }
}
