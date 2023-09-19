import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { GetUserHandler } from './queries/handler/get-user.handler';
import { UserRepository } from '@repositorise/repositories';
import { CreateUserHandler } from './commands/handler/create-user.handler';

@Module({
  imports: [CqrsModule],
  controllers: [AccountController],
  providers: [UserRepository, GetUserHandler, CreateUserHandler],
})
export class AccountModule {}
