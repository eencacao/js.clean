import { TaskRepository } from "../infrastructure/TaskRepository";
import { Task } from "../entities/Task";

export class ListTasks {
    private taskRepository: TaskRepository;

    constructor(taskRepository: TaskRepository) {
        this.taskRepository = taskRepository;
    }

    execute(): Task[] {
        return this.taskRepository.getAll();
    }
}