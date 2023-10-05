import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCategoryCommand } from '../impl/update-category.command';
import { CategoryRepository } from '@repositorise/repositories';
import { CategoryEntity } from '@entities/entities';
import { ICategory } from '@interfaces/interfaces';

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler
  implements ICommandHandler<UpdateCategoryCommand>
{
  constructor(private readonly categoryRepository: CategoryRepository) {}
  execute(command: UpdateCategoryCommand): Promise<ICategory> {
    try {
      const { category, id } = command;
      return this.categoryRepository.updateCategory(
        new CategoryEntity(category),
        id,
      );
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
