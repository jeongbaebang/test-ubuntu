import { Context, Next } from "@oak/oak";

export default async (ctx: Context, next: Next) => {
  console.log(`${ctx.request.method} ${ctx.request.url.pathname}`);
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.request.method} ${ctx.request.url.pathname} - ${ms}ms`);
};
