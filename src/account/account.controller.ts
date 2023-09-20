import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserQuery } from './queries/impl/get-user.query';
import { IUser } from '@interfaces/interfaces';
import { AccountUpdate } from '@contracts/contracts';
import { UpdateUserCommand } from './commands/impl/update-user.comman';

@Controller('account')
export class AccountController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get(':id')
  public async getAccount(@Param() params: { id: string }): Promise<IUser> {
    return await this.queryBus.execute(new GetUserQuery(params.id));
  }

  @Patch(AccountUpdate.topic)
  public async updateUser(
    @Param() param: { id: string },
    @Body() user: AccountUpdate.Request,
  ): Promise<AccountUpdate.Response> {
    return this.commandBus.execute(
      new UpdateUserCommand(param.id, user.userName, user.email),
    );
  }
}
