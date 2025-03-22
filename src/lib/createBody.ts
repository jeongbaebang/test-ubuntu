import { Context } from "@oak/oak";

export const createBody = <D>(
  ctx: Context,
  status: 201 | 200 | 400 | 404,
  payload: D,
) => {
  ctx.response.status = status;
  ctx.response.body = {
    data: payload,
  };
};
