import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/db.service';
import { ICategory, PartialCategory } from '@interfaces/interfaces';
import { CategoryEntity } from '@entities/entities';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async getCategoryById(identifire: string): Promise<ICategory> {
    const isExist = await this.findCategoryById(identifire);
    if (!isExist) {
      throw new Error("Category doesn't exist");
    }
    return isExist;
  }

  public async getAllCategories(userId: string): Promise<ICategory[]> {
    return this.prismaService.category.findMany({
      where: {
        userId,
      },
    });
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

  public async updateCategory(
    category: CategoryEntity,
    id: string,
  ): Promise<ICategory> {
    const isExist = await this.findCategoryById(id);
    if (!isExist) {
      throw new HttpException("Category doesn't exist", HttpStatus.NOT_FOUND);
    }
    return this.prismaService.category.update({
      where: { id: id },
      data: category,
      include: {
        subCategory: true,
      },
    });
  }

  public async deleteCategory(id: string): Promise<ICategory> {
    const isExist = await this.findCategoryById(id);
    if (!isExist) {
      throw new HttpException("Category doesn't exist", HttpStatus.NOT_FOUND);
    }
    return this.prismaService.category.delete({ where: { id } });
  }

  private async findCategoryById(identifire: string): Promise<ICategory> {
    return this.prismaService.category.findUnique({
      where: {
        id: identifire,
      },
      include: {
        subCategory: true,
      },
    });
  }
}
