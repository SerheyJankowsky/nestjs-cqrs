import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserQuery } from './queries/impl/get-user.query';
import { IExtractUser, IUser } from '@interfaces/interfaces';
import { AccountUpdate } from '@contracts/contracts';
import { UpdateUserCommand } from './commands/impl/update-user.comman';
import { Auth } from '@guards';
import { User } from '@decorators';

@Controller('account')
export class AccountController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Auth()
  @Get()
  public async getAccount(@User() extractUser: IExtractUser): Promise<IUser> {
    return await this.queryBus.execute(new GetUserQuery(extractUser.id));
  }

  @Auth()
  @Patch(AccountUpdate.topic)
  public async updateUser(
    @User() extractUser: IExtractUser,
    @Body() user: AccountUpdate.Request,
  ): Promise<AccountUpdate.Response> {
    return this.commandBus.execute(
      new UpdateUserCommand(extractUser.id, user.userName, user.email),
    );
  }
}
