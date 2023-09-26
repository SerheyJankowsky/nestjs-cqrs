import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LoginQuery } from '../impl/login.query';
import { IUser } from '@interfaces/interfaces';
import { UserRepository } from '@repositorise/repositories';
import { UserEntity } from '@entities/entities';
import { HttpException, HttpStatus } from '@nestjs/common';

@QueryHandler(LoginQuery)
export class LoginHandler implements IQueryHandler<LoginQuery> {
  constructor(private readonly userRepository: UserRepository) {}
  public async execute(query: LoginQuery): Promise<IUser> {
    const isExist = await this.userRepository.loginUser(query.email);
    const user = new UserEntity(isExist);
    const match = await user.validatePassword(query.password);
    if (!match) {
      throw new HttpException(
        'Password validation failed',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
