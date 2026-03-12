import { Todo } from "../entities/todo";

export interface ITodoRepository {
  getAll(): Todo[];
  getById(id: number): Todo | undefined;
  save(title: string): Todo;
  update(id: number, title: string, done: boolean): Todo | undefined;
  delete(id: number): boolean;
}
