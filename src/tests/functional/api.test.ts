import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { MemoryRepo } from "../../infrastructure/memory_repo";
import { TodoUseCase } from "../../usecases/todo_usecase";
import {
  handleGetAll, handleGetOne, handleCreate,
  handleUpdate, handleDelete,
} from "../../adapters/todo_handler";
import { sendError, parseId } from "../../adapters/helpers";

let server: http.Server;
let port: number;

function makeServer(): http.Server {
  const uc = new TodoUseCase(new MemoryRepo());
  return http.createServer(async (req, res) => {
    const method = req.method ?? "";
    const path = req.url ?? "";
    const id = parseId(path);
    if (!id && path !== "/todos" && path !== "/todos/") {
      return sendError(res, 404, "not found");
    }
    if (!id) {
      if (method === "GET")  return handleGetAll(uc, res);
      if (method === "POST") return handleCreate(uc, req, res);
      return sendError(res, 405, "not allowed");
    }
    if (method === "GET")    return handleGetOne(uc, res, id);
    if (method === "PUT")    return handleUpdate(uc, req, res, id);
    if (method === "DELETE") return handleDelete(uc, res, id);
    sendError(res, 405, "not allowed");
  });
}

function request(
  method: string,
  path: string,
  body?: string,
): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: "localhost", port,
      path, method,
      headers: body ? { "Content-Type": "application/json" } : {},
    };
    const req = http.request(opts, (res) => {
      let data = "";
      res.on("data", (c) => { data += c; });
      res.on("end", () =>
        resolve({ status: res.statusCode ?? 0, body: data })
      );
    });
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

describe("Todo API", () => {
  before(() => new Promise<void>((resolve) => {
    server = makeServer();
    server.listen(0, () => {
      port = (server.address() as { port: number }).port;
      resolve();
    });
  }));

  after(() => new Promise<void>((resolve) => {
    server.close(() => resolve());
  }));

  it("GET /todos returns empty array", async () => {
    const res = await request("GET", "/todos");
    assert.equal(res.status, 200);
    assert.deepEqual(JSON.parse(res.body), []);
  });

  it("POST /todos creates todo", async () => {
    const res = await request("POST", "/todos", '{"title":"test"}');
    assert.equal(res.status, 201);
    const body = JSON.parse(res.body);
    assert.equal(body.title, "test");
    assert.equal(body.completed, false);
  });

  it("GET /todos/1 returns created todo", async () => {
    const res = await request("GET", "/todos/1");
    assert.equal(res.status, 200);
  });

  it("GET /todos/99 returns 404", async () => {
    const res = await request("GET", "/todos/99");
    assert.equal(res.status, 404);
  });

  it("PUT /todos/1 updates todo", async () => {
    const res = await request(
      "PUT", "/todos/1",
      '{"title":"updated","completed":true}',
    );
    assert.equal(res.status, 200);
    const body = JSON.parse(res.body);
    assert.equal(body.title, "updated");
    assert.equal(body.completed, true);
  });

  it("DELETE /todos/1 removes todo", async () => {
    const res = await request("DELETE", "/todos/1");
    assert.equal(res.status, 204);
  });

  it("DELETE /todos/1 again returns 404", async () => {
    const res = await request("DELETE", "/todos/1");
    assert.equal(res.status, 404);
  });
});
