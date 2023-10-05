import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCategoryQuery } from '../impl/get-category.query';
import { ICategory } from '@interfaces/interfaces';
import { CategoryRepository } from '@repositorise/repositories';

@QueryHandler(GetCategoryQuery)
export class GetCategoryHandler implements IQueryHandler<GetCategoryQuery> {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  execute(query: GetCategoryQuery): Promise<ICategory> {
    try {
      const { id } = query;
      return this.categoryRepository.getCategoryById(id);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
