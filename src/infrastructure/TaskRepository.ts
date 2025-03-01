import { Task } from "../entities/Task";

export class TaskRepository {
    private tasks: Task[] = [];

    add(task: Task): Task {
        this.tasks.push(task);
        return task;
    }

    getAll(): Task[] {
        return this.tasks;
    }
}