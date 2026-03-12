import { IncomingMessage, ServerResponse } from "http";

export function sendJson(
  res: ServerResponse, code: number, data: unknown
): void {
  const body = JSON.stringify(data);
  res.writeHead(code, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

export function sendError(
  res: ServerResponse, code: number, msg: string
): void {
  sendJson(res, code, { error: msg });
}

export function parseId(path: string): number | null {
  const parts = path.split("/").filter(Boolean);
  if (parts.length < 2) return null;
  const id = parseInt(parts[1], 10);
  return isNaN(id) ? null : id;
}

export function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => { data += chunk; });
    req.on("end", () => resolve(data));
  });
}
