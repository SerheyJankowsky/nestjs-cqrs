import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../impl/create-user.command';
import { IUser } from '@interfaces/interfaces';
import { UserRepository } from '@repositorise/repositories';
import { UserEntity } from '@entities/entities';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}
  public async execute(command: CreateUserCommand): Promise<IUser> {
    const user = new UserEntity(command);
    await user.hashPassword(command.password);
    return await this.userRepository.createUser(user);
  }
}
