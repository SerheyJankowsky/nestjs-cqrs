import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/db.service';
import { ICategory } from '@interfaces/interfaces';
import { CategoryEntity } from '@entities/entities';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async getUserCategories(userId: string): Promise<ICategory[]> {
    return this.findUserCategoryById(userId);
  }

  public async getCategoryById(identifire: string): Promise<ICategory> {
    return this.findCategoryById(identifire);
  }

  public async createCategory(
    category: CategoryEntity,
    userId: string,
  ): Promise<ICategory> {
    return this.prismaService.category.create({
      data: {
        ...category,
        userId,
      },
    });
  }

  public async deleteCategory(id: string): Promise<ICategory> {
    const isExist = await this.findCategoryById(id);
    if (!isExist) {
      throw new Error("Category doesn't exist");
    }
    return this.prismaService.category.delete({ where: { id } });
  }

  private async findCategoryById(identifire: string): Promise<ICategory> {
    return this.prismaService.category.findUnique({
      where: {
        id: identifire,
      },
    });
  }

  private async findUserCategoryById(userId: string): Promise<ICategory[]> {
    return this.prismaService.category.findMany({
      where: {
        userId,
      },
    });
  }
}
