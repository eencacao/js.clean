import { IncomingMessage, ServerResponse } from "http";
import { TodoUseCase } from "../usecases/todo_usecase";
import { sendJson, sendError, readBody } from "./helpers";

export async function handleGetAll(
  uc: TodoUseCase, res: ServerResponse
): Promise<void> {
  sendJson(res, 200, uc.getAll());
}

export async function handleGetOne(
  uc: TodoUseCase, res: ServerResponse, id: number
): Promise<void> {
  const todo = uc.getById(id);
  if (!todo) return sendError(res, 404, "not found");
  sendJson(res, 200, todo);
}

export async function handleCreate(
  uc: TodoUseCase, req: IncomingMessage, res: ServerResponse
): Promise<void> {
  const body = await readBody(req);
  const data = JSON.parse(body || "{}");
  if (!data.title) return sendError(res, 400, "title required");
  sendJson(res, 201, uc.create(data.title));
}

export async function handleUpdate(
  uc: TodoUseCase,
  req: IncomingMessage,
  res: ServerResponse,
  id: number
): Promise<void> {
  const body = await readBody(req);
  const data = JSON.parse(body || "{}");
  const todo = uc.update(id, data.title ?? "", data.completed ?? false);
  if (!todo) return sendError(res, 404, "not found");
  sendJson(res, 200, todo);
}

export async function handleDelete(
  uc: TodoUseCase, res: ServerResponse, id: number
): Promise<void> {
  if (!uc.delete(id)) return sendError(res, 404, "not found");
  res.writeHead(204).end();
}
