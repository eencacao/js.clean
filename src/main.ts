import http from "http";
import { MemoryRepo } from "./infrastructure/memory_repo";
import { TodoUseCase } from "./usecases/todo_usecase";
import {
  handleGetAll, handleGetOne, handleCreate,
  handleUpdate, handleDelete,
} from "./adapters/todo_handler";
import { sendError, parseId } from "./adapters/helpers";

const uc = new TodoUseCase(new MemoryRepo());

async function router(
  req: http.IncomingMessage,
  res: http.ServerResponse
): Promise<void> {
  const method = req.method ?? "";
  const path   = req.url ?? "";
  const id     = parseId(path);
  if (!id && path !== "/todos" && path !== "/todos/") {
    return sendError(res, 404, "not found");
  }
  if (!id) {
    if (method === "GET")  return handleGetAll(uc, res);
    if (method === "POST") return handleCreate(uc, req, res);
    return sendError(res, 405, "method not allowed");
  }
  if (method === "GET")    return handleGetOne(uc, res, id);
  if (method === "PUT")    return handleUpdate(uc, req, res, id);
  if (method === "DELETE") return handleDelete(uc, res, id);
  sendError(res, 405, "method not allowed");
}

http.createServer((req, res) => {
  router(req, res).catch(() => sendError(res, 500, "server error"));
}).listen(8080, () => console.log("Listening on :8080"));
