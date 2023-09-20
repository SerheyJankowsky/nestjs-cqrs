import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../impl/update-user.comman';
import { IUser } from '@interfaces/interfaces';
import { UserRepository } from '@repositorise/repositories';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(command: UpdateUserCommand): Promise<IUser> {
    return await this.userRepository.updateUser(command);
  }
}
