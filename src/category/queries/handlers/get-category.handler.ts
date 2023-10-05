import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCategoryQuery } from '../impl/get-category.query';
import { ICategory } from '@interfaces/interfaces';
import { CategoryRepository } from '@repositorise/repositories';
import { HttpException, HttpStatus } from '@nestjs/common';

@QueryHandler(GetCategoryQuery)
export class GetCategoryHandler implements IQueryHandler<GetCategoryQuery> {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async execute(query: GetCategoryQuery): Promise<ICategory> {
    try {
      const { id } = query;
      return await this.categoryRepository.getCategoryById(id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }
}
