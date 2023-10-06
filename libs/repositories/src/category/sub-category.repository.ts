import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../src/db/db.service';
import {
  ICategory,
  ISubCategory,
  PartialSubCategory,
} from '@interfaces/interfaces';
import { SubcategoryEntity } from '@entities/entities';

@Injectable()
export class SubCategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async getSubCategoryById(id: string): Promise<ISubCategory> {
    const isExist = await this.findSubCategory(id);
    if (!isExist) {
      throw new Error("SubCategory doesn't exist");
    }
    return isExist;
  }

  public async getAllSubCategories(
    categoryId: string,
  ): Promise<ISubCategory[]> {
    return this.prismaService.subCategory.findMany({
      where: {
        categoryId,
      },
    });
  }

  public async createSubCategory(
    subCategory: SubcategoryEntity,
    categoryId: string,
  ): Promise<ISubCategory> {
    const isExist = await this.findCategory(categoryId);
    if (!isExist) {
      throw new Error("Category doesn't exist");
    }
    return this.prismaService.subCategory.create({
      data: {
        ...subCategory,
        categoryId,
      },
    });
  }

  public async updateSubCategory(
    subCategory: PartialSubCategory,
    id: string,
  ): Promise<ISubCategory> {
    const isExist = await this.findSubCategory(id);
    if (!isExist) {
      throw new HttpException(
        "SubCategory doesn't exist",
        HttpStatus.NOT_FOUND,
      );
    }
    return this.prismaService.subCategory.update({
      where: { id },
      data: {
        name: subCategory.name,
        image: subCategory.image ?? '',
      },
    });
  }

  public async updateSubCategoryCategory(
    id: string,
    categoryId: string,
  ): Promise<ISubCategory> {
    const isExist = await this.findSubCategory(id);
    const isCategoryExist = await this.findCategory(categoryId);
    if (!isExist) {
      throw new HttpException(
        "SubCategory doesn't exist",
        HttpStatus.NOT_FOUND,
      );
    }
    if (!isCategoryExist) {
      throw new HttpException("Category doesn't exist", HttpStatus.NOT_FOUND);
    }
    return this.prismaService.subCategory.update({
      where: { id },
      data: {
        categoryId,
      },
    });
  }

  public async deleteSubCategory(id: string): Promise<ISubCategory> {
    const isExist = await this.findSubCategory(id);
    if (!isExist) {
      throw new HttpException(
        "SubCategory doesn't exist",
        HttpStatus.NOT_FOUND,
      );
    }
    return this.prismaService.subCategory.delete({ where: { id } });
  }

  private findSubCategory(id: string): Promise<ISubCategory> {
    return this.prismaService.subCategory.findUnique({ where: { id } });
  }

  private findCategory(id: string): Promise<ICategory> {
    return this.prismaService.category.findUnique({ where: { id } });
  }
}
