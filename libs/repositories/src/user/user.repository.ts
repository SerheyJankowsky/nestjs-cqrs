import { UserEntity } from '@entities/entities';
import { IUser } from '@interfaces/interfaces';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/db.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async createUser(user: UserEntity): Promise<IUser> {
    const userExist = await this.find(user.email);
    if (userExist) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const newUser = await this.prismaService.user.create({
      data: user,
    });
    return newUser;
  }

  public async findUser(id: string): Promise<IUser> {
    const user = await this.find(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  public async loginUser(email: string): Promise<IUser> {
    const user = await this.findUser(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  public async updateUser(user: Partial<IUser>): Promise<IUser> {
    const existUser = await this.find(user.id);
    if (!existUser) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    try {
      return await this.prismaService.user.update({
        where: {
          id: existUser.id,
        },
        data: user,
      });
    } catch (e) {
      if (e.code === 'P2002') {
        throw new HttpException(
          `User with ${e.meta.target}:${user[e.meta.target]} is exist`,
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  private async find(identifire: string) {
    return this.prismaService.user.findFirst({
      where: {
        OR: [{ email: identifire }, { id: identifire }],
      },
    });
  }
}
