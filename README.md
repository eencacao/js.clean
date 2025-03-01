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
│   │   ├── Task.js
│   ├── use-cases/         # Application logic
│   │   ├── CreateTask.js
│   │   ├── ListTasks.js
│   ├── interfaces/        # Adapters (Controllers, UI, etc.)
│   │   ├── TaskController.js
│   ├── infrastructure/    # External services (DB, API)
│   │   ├── TaskRepository.js
│   ├── main.js            # Entry point
└── package.json
```
