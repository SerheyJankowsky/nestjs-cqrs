import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { GetUserHandler } from './queries/handler/get-user.handler';
import { UserRepository } from '@repositorise/repositories';
import { UpdateUserHandler } from './commands/handler/update-user.handler';

@Module({
  imports: [CqrsModule],
  controllers: [AccountController],
  providers: [UserRepository, GetUserHandler, UpdateUserHandler],
})
export class AccountModule {}
