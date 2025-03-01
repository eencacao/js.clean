import { CreateTask } from "../use-cases/CreateTask";
import { ListTasks } from "../use-cases/ListTasks";
import { Task } from "../entities/Task";

export class TaskController {
    private createTaskUseCase: CreateTask;
    private listTasksUseCase: ListTasks;

    constructor(createTaskUseCase: CreateTask, listTasksUseCase: ListTasks) {
        this.createTaskUseCase = createTaskUseCase;
        this.listTasksUseCase = listTasksUseCase;
    }

    createTask(title: string, description: string): Task {
        return this.createTaskUseCase.execute(title, description);
    }

    listTasks(): Task[] {
        return this.listTasksUseCase.execute();
    }
}