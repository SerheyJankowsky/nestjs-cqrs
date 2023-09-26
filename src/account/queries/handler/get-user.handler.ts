import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../impl/get-user.query';
import { UserRepository } from '@repositorise/repositories';
import { IUser } from '@interfaces/interfaces';
import { UserEntity } from '@entities/entities';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(query: GetUserQuery): Promise<IUser> {
    const { id } = query;
    const user = await this.userRepository.findUser(id);
    return new UserEntity(user);
  }
}
