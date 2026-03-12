import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { TodoUseCase } from "../../usecases/todo_usecase";
import { MemoryRepo } from "../../infrastructure/memory_repo";

function makeUC(): TodoUseCase {
  return new TodoUseCase(new MemoryRepo());
}

describe("TodoUseCase", () => {
  it("create returns todo with correct fields", () => {
    const uc = makeUC();
    const todo = uc.create("buy milk");
    assert.equal(todo.id, 1);
    assert.equal(todo.title, "buy milk");
    assert.equal(todo.completed, false);
    assert.ok(todo.created_at);
  });

  it("getAll returns empty then populated list", () => {
    const uc = makeUC();
    assert.deepEqual(uc.getAll(), []);
    uc.create("a");
    uc.create("b");
    assert.equal(uc.getAll().length, 2);
  });

  it("getById returns todo or undefined", () => {
    const uc = makeUC();
    uc.create("find me");
    assert.ok(uc.getById(1));
    assert.equal(uc.getById(99), undefined);
  });

  it("update changes title and completed", () => {
    const uc = makeUC();
    uc.create("old");
    const updated = uc.update(1, "new", true);
    assert.equal(updated?.title, "new");
    assert.equal(updated?.completed, true);
    assert.equal(uc.update(99, "x", false), undefined);
  });

  it("delete removes todo", () => {
    const uc = makeUC();
    uc.create("bye");
    assert.equal(uc.delete(1), true);
    assert.equal(uc.delete(1), false);
  });
});
