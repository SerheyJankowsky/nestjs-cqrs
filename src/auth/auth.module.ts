import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserRepository } from '@repositorise/repositories';
import { CreateUserHandler } from './commands/handlers/create-user.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { LoginHandler } from './queries/handlers/login.handler';

@Module({
  imports: [CqrsModule],
  controllers: [AuthController],
  providers: [UserRepository, CreateUserHandler, LoginHandler],
})
export class AuthModule {}
