import { TaskRepository } from "./infrastructure/TaskRepository";
import { CreateTask } from "./use-cases/CreateTask";
import { ListTasks } from "./use-cases/ListTasks";
import { TaskController } from "./interfaces/TaskController";

const taskRepository = new TaskRepository();
const createTask = new CreateTask(taskRepository);
const listTasks = new ListTasks(taskRepository);
const taskController = new TaskController(createTask, listTasks);

taskController.createTask("Learn Clean Architecture", "Understand how to apply it in JavaScript/Typescript");
taskController.createTask("Implement a Todo App", "Use clean architecture principles");

console.log("Tasks:", taskController.listTasks());