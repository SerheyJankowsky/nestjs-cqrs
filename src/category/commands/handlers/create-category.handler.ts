import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCategoryCommand } from '../impl/create-category.command';
import { CategoryRepository } from '@repositorise/repositories';
import { ICategory } from '@interfaces/interfaces';
import { CategoryEntity } from '@entities/entities';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler
  implements ICommandHandler<CreateCategoryCommand>
{
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async execute(command: CreateCategoryCommand): Promise<ICategory> {
    const { category, userId } = command;
    try {
      return await this.categoryRepository.createCategory(
        new CategoryEntity(category),
        userId,
      );
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
