import { Application } from "@oak/oak";

import { userRouter } from "./userRoutes.ts";

export function setupRoutes(app: Application) {
  app.use(userRouter.routes());
  app.use(userRouter.allowedMethods());

  return app;
}
