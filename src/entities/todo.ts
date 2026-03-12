export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
}

export function newTodo(id: number, title: string): Todo {
  return {
    id,
    title,
    completed: false,
    created_at: new Date().toISOString(),
  };
}
