import { AccountLogin, AccountRegister } from '@contracts/contracts';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { LoginQuery } from './queries/impl/login.query';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post(AccountRegister.topic)
  public async register(
    @Body() user: AccountRegister.Request,
  ): Promise<AccountRegister.Response> {
    return this.commandBus.execute(
      new CreateUserCommand(user.userName, user.email, user.password),
    );
  }

  @Post(AccountLogin.topic)
  public async login(
    @Body() user: AccountLogin.Request,
  ): Promise<AccountLogin.Response> {
    return this.queryBus.execute(new LoginQuery(user.email, user.password));
  }
}
