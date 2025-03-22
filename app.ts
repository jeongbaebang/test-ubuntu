import "@std/dotenv/load";
import { Application } from "@oak/oak";

import { setupRoutes } from "./src/routes/index.ts";
import loggingMiddleware from "./src/middleware/logging.ts";
import errorBoundaryMiddleware from "./src/middleware/errorBoundary.ts";

const app = new Application();

app.use(loggingMiddleware);
app.use(errorBoundaryMiddleware);
setupRoutes(app);

const port = Deno.env.get("PORT");

if (!port) {
  throw new Error("Port must be specified");
}

app.addEventListener("listen", () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다`);
});

await app.listen({ port: parseInt(port) });
