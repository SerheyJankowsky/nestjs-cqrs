import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSubCategoryQuery } from '../impl/get-sub-category.command';
import { ISubCategory } from '@interfaces/interfaces';
import { SubCategoryRepository } from '@repositorise/repositories';
import { HttpException } from '@nestjs/common';

@QueryHandler(GetSubCategoryQuery)
export class GetSubCategoryHandler
  implements IQueryHandler<GetSubCategoryQuery>
{
  constructor(private readonly subCategoryRepository: SubCategoryRepository) {}
  async execute(query: GetSubCategoryQuery): Promise<ISubCategory> {
    try {
      const { id } = query;
      return await this.subCategoryRepository.getSubCategoryById(id);
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }
}
