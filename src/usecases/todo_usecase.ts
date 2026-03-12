import { Todo } from "../entities/todo";
import { ITodoRepository } from "../interfaces/todo_repository";

export class TodoUseCase {
  constructor(private repo: ITodoRepository) {}

  getAll(): Todo[] {
    return this.repo.getAll();
  }

  getById(id: number): Todo | undefined {
    return this.repo.getById(id);
  }

  create(title: string): Todo {
    return this.repo.save(title);
  }

  update(id: number, title: string, done: boolean): Todo | undefined {
    return this.repo.update(id, title, done);
  }

  delete(id: number): boolean {
    return this.repo.delete(id);
  }
}
