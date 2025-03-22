import { Context, Next } from "@oak/oak";

export default async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = {
      success: false,
      message: "서버 내부 오류가 발생했습니다",
    };
  }
};
