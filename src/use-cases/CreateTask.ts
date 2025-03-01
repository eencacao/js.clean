import { Task } from "../entities/Task";
import { TaskRepository } from "../infrastructure/TaskRepository";

export class CreateTask {
    private taskRepository: TaskRepository;

    constructor(taskRepository: TaskRepository) {
        this.taskRepository = taskRepository;
    }

    execute(title: string, description: string): Task {
        const id = Date.now().toString();
        const task = new Task(id, title, description);
        return this.taskRepository.add(task);
    }
}