import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSubCategoryCommand } from '../impl/create-sub-category.command';
import { SubCategoryRepository } from '@repositorise/repositories';
import { ISubCategory } from '@interfaces/interfaces';
import { SubcategoryEntity } from '@entities/entities';
import { HttpException, HttpStatus } from '@nestjs/common';

@CommandHandler(CreateSubCategoryCommand)
export class CreateSubCategoryHandler
  implements ICommandHandler<CreateSubCategoryCommand>
{
  constructor(private readonly subCategoryRepository: SubCategoryRepository) {}
  async execute(command: CreateSubCategoryCommand): Promise<ISubCategory> {
    try {
      const { subCategory, categoryId } = command;
      return await this.subCategoryRepository.createSubCategory(
        new SubcategoryEntity(subCategory),
        categoryId,
      );
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
