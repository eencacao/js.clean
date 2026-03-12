import { Todo, newTodo } from "../entities/todo";
import { ITodoRepository } from "../interfaces/todo_repository";

export class MemoryRepo implements ITodoRepository {
  private todos = new Map<number, Todo>();
  private counter = 0;

  getAll(): Todo[] {
    return Array.from(this.todos.values());
  }

  getById(id: number): Todo | undefined {
    return this.todos.get(id);
  }

  save(title: string): Todo {
    const id = ++this.counter;
    const todo = newTodo(id, title);
    this.todos.set(id, todo);
    return todo;
  }

  update(id: number, title: string, done: boolean): Todo | undefined {
    const todo = this.todos.get(id);
    if (!todo) return undefined;
    const updated = { ...todo, title, completed: done };
    this.todos.set(id, updated);
    return updated;
  }

  delete(id: number): boolean {
    return this.todos.delete(id);
  }
}
