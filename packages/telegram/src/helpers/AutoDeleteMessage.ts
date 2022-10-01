import { Context } from "../context";

export function AutoDeleteMessage(ctx: Context, message: string, delay = 5000) {
  ctx.reply(message)
  .then((m) => {
    setTimeout(() => {
      m.delete();
    }, 5000);
  });
};