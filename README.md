# CLEAN

### Exercise: Task Management App

An application with the following layers:  
- Entities (Domain Layer) → Pure business logic, independent of frameworks.   
- Use Cases (Application Layer) → Orchestrates business logic and defines application behavior.   
- Adapters (Interface Layer) → Controllers, presenters, and UI elements.   
- Infrastructure (Data Layer) → External services (database, APIs, frameworks).   

```
./
│── src/
│   ├── entities/          # Domain models
│   │   ├── Task.ts
│   ├── use-cases/        # Application logic
│   │   ├── CreateTask.ts
│   │   ├── ListTasks.ts
│   ├── interfaces/       # Adapters (Controllers, UI, etc.)
│   │   ├── TaskController.ts
│   ├── infrastructure/   # External services (DB, API)
│   │   ├── TaskRepository.ts
│   ├── main.ts           # Entry point
│── .gitignore
│── LICENSE
│── package.json
│── README.md
└── tsconfig.json
```
