import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/db/db.service';
import { IThing } from '@interfaces/interfaces';

@Injectable()
export class ThingRepository {
  constructor(private readonly prismaService: PrismaService) {}
  public async getThingsByCategory(category): Promise<IThing[]> {
    return this.prismaService.thing.findMany({
      where: {
        OR: [{ categoryId: category }, { subCategoryId: category }],
      },
    });
  }
  public async getThingById(id: string): Promise<IThing> {
    return this.prismaService.thing.findUnique({
      where: {
        id,
      },
    });
  }
  public async getThingsByTag(tag: string[], userId): Promise<IThing[]> {
    return this.prismaService.thing.findMany({
      where: {
        userId,
        tags: {
          hasSome: tag,
        },
      },
    });
  }
  public async createThing(data: IThing): Promise<IThing> {
    return this.prismaService.thing.create({
      data,
    });
  }

  public async updateThing(id: string, data: IThing): Promise<IThing> {
    return this.prismaService.thing.update({
      where: {
        id,
      },
      data,
    });
  }

  public async deleteThing(id: string): Promise<IThing> {
    return this.prismaService.thing.delete({
      where: {
        id,
      },
    });
  }
}
