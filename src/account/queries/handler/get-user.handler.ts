import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../impl/get-user.query';
import { UserRepository } from '@repositorise/repositories';
import { IUser } from '@interfaces/interfaces';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(query: GetUserQuery): Promise<IUser> {
    const { id } = query;
    return await this.userRepository.findUser(id);
  }
}
