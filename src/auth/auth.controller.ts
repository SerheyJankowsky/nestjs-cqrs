import { AccountLogin, AccountRegister } from '@contracts/contracts';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { LoginQuery } from './queries/impl/login.query';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly jwtService: JwtService,
  ) {}

  @Post(AccountRegister.topic)
  public async register(
    @Body() user: AccountRegister.Request,
  ): Promise<AccountRegister.Response> {
    const newUser = await this.commandBus.execute(
      new CreateUserCommand(user.userName, user.email, user.password),
    );
    const token = this.jwtService.sign({
      id: newUser.id,
      email: newUser.email,
      userName: newUser.userName,
    });
    return { token, user: newUser };
  }

  @Post(AccountLogin.topic)
  public async login(
    @Body() user: AccountLogin.Request,
  ): Promise<AccountLogin.Response> {
    const userLogin = await this.queryBus.execute(
      new LoginQuery(user.email, user.password),
    );
    const token = this.jwtService.sign({
      id: userLogin.id,
      email: userLogin.email,
      userName: userLogin.userName,
    });
    return { token, user: userLogin };
  }
}
