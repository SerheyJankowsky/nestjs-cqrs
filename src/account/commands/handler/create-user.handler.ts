import { User } from '@prisma/client';
import { CreateUserCommand } from '../impl/create-user.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '@repositorise/repositories';
import { UserEntity } from '@entities/entities';
import { IUser } from '@interfaces/interfaces';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: CreateUserCommand): Promise<IUser> {
    const user = new UserEntity(command);
    await user.hashPassword(command.password);
    return await this.userRepository.createUser(user);
  }
}
