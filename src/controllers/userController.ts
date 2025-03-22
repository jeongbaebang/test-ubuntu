import { Context, RouterContext } from "@oak/oak";

import { CreateUserInput } from "./../schemas/userSchema.ts";
import { UserService } from "../services/userService.ts";
import { createBody } from "../lib/createBody.ts";

export class UserController {
  constructor(private userService: UserService) {}

  async createUser(ctx: Context) {
    const input: CreateUserInput = await ctx.request.body.json();
    const user = await this.userService.createUser(input);

    createBody(ctx, 201, user);
  }

  async getUser(ctx: RouterContext<"/:id">) {
    const id = ctx.params.id;
    const user = await this.userService.getUserById(id);

    if (user) {
      createBody(ctx, 200, user);
    } else {
      createBody(ctx, 404, { message: "User not found" });
    }
  }
}
