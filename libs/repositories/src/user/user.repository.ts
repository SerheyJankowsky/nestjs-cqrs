import { UserEntity } from '@entities/entities';
import { IUser } from '@interfaces/interfaces';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/db.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async createUser(user: UserEntity): Promise<IUser> {
    const userExist = await this.prismaService.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (userExist) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const newUser = await this.prismaService.user.create({
      data: user,
    });
    return newUser;
  }

  public async findUser(id: string): Promise<IUser> {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
