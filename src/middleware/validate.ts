import { Next, RouterContext } from "@oak/oak";
import { z } from "zod";

import { createBody } from "../lib/createBody.ts";

export const validate = (schema: z.ZodSchema) => {
  return async (ctx: RouterContext<string>, next: Next) => {
    try {
      schema.parse({
        body: await ctx.request.body.json(),
        params: ctx.params,
      });
      await next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        createBody(ctx, 400, { errors: error.errors });
        return;
      }
      throw error;
    }
  };
};
