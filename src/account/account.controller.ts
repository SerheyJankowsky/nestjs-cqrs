import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserQuery } from './queries/impl/get-user.query';
import { IUser } from '@interfaces/interfaces';
import { CreateUserCommand } from './commands/impl/create-user.command';

@Controller('account')
export class AccountController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get(':id')
  async getAccount(@Param() params: { id: string }): Promise<IUser> {
    return await this.queryBus.execute(new GetUserQuery(params.id));
  }

  @Post()
  async createUser(@Body() user: IUser): Promise<IUser> {
    const { userName, email, password } = user;
    return await this.commandBus.execute(
      new CreateUserCommand(userName, email, password),
    );
  }
}
