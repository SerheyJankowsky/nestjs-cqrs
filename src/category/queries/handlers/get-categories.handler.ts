import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCategoriesQuery } from '../impl/get-categories.query';
import { HttpException } from '@nestjs/common';
import { CategoryRepository } from '@repositorise/repositories';

@QueryHandler(GetCategoriesQuery)
export class GetCategoriesHandler implements IQueryHandler<GetCategoriesQuery> {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async execute(query: GetCategoriesQuery): Promise<any> {
    try {
      const { userId } = query;
      return await this.categoryRepository.getAllCategories(userId);
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }
}
