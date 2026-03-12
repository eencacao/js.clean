# Todo API — TypeScript Clean Architecture

A RESTful To-Do list API built with TypeScript, following Clean Architecture.
Uses only Node.js built-in modules (no runtime dependencies).

## Architecture

```
src/
├── entities/        Pure domain model (Todo)
├── interfaces/      Repository contract
├── usecases/        Business logic (CRUD)
├── infrastructure/  In-memory repository
└── adapters/        HTTP handlers
```

## API Endpoints

| Method | Endpoint     | Description    |
|--------|--------------|----------------|
| GET    | /todos       | List all todos |
| POST   | /todos       | Create a todo  |
| GET    | /todos/{id}  | Get by ID      |
| PUT    | /todos/{id}  | Update a todo  |
| DELETE | /todos/{id}  | Delete a todo  |

## Todo Object

```json
{
  "id": 1,
  "title": "Buy groceries",
  "completed": false,
  "created_at": "2026-03-12T11:00:00Z"
}
```

## Requirements

- Node.js 18+
- npm

## Setup & Run

```bash
npm install
npm run dev
```

Server runs on `http://localhost:8080`.
