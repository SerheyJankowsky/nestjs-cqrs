import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../src/db/db.service';
import { ISubCategory, PartialSubCategory } from '@interfaces/interfaces';

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

  public createSubCategory(
    subCategory: PartialSubCategory,
    categoryId: string,
  ): Promise<ISubCategory> {
    return this.prismaService.subCategory.create({
      data: {
        name: subCategory.name,
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
      throw new Error("SubCategory doesn't exist");
    }
    return this.prismaService.subCategory.update({
      where: { id },
      data: {
        name: subCategory.name,
      },
    });
  }

  public async updateSubCategoryCategory(
    id: string,
    categoryId: string,
  ): Promise<ISubCategory> {
    const isExist = await this.findSubCategory(id);
    if (!isExist) {
      throw new Error("SubCategory doesn't exist");
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
      throw new Error("SubCategory doesn't exist");
    }
    return this.prismaService.subCategory.delete({ where: { id } });
  }

  private findSubCategory(id: string): Promise<ISubCategory> {
    return this.prismaService.subCategory.findUnique({ where: { id } });
  }
}
