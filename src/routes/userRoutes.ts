import { Router } from "@oak/oak";

import { validate } from "../middleware/validate.ts";
import { createUserSchema } from "../schemas/userSchema.ts";
import { LocalUserRepository } from "../repositories/user/localRepository.ts";
import { UserService } from "../services/userService.ts";
import { UserController } from "../controllers/userController.ts";

const createUserRouter = (controller: UserController): Router => {
  const router = new Router({ prefix: "/users" });

  router
    .post(
      "/",
      validate(createUserSchema),
      controller.createUser.bind(controller),
    )
    .get("/:id", controller.getUser.bind(controller));

  return router;
};

const userRepository = new LocalUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const userRouter = createUserRouter(userController);

export { userRouter };
