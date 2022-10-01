import { TRPCClientError } from "@trpc/client";
import { NextFunction } from "grammy";
import { Client } from "../client";
import { Context } from "../context";

export function UserProfileMiddleware() {
  return async function UserProfileMiddleware(ctx: Context, next: NextFunction) {
    // Trying to fetch user profile
    try {
      const user = await Client.query('users.getUser', ctx.from.id);
      
      // Updating our current session
      ctx.session.profile = user;

      return next();
    } catch(error: any) {
      if (error instanceof TRPCClientError) {
        if (error.message.includes("user/not_found")) {
          // Trying to create user
          const user = await Client.mutation('users.createUser', { id: ctx.from.id });

          ctx.session.profile = user;

          return next();
        };
      }

      // todo
      // Error logging
      const errorId = "TODO_ERROR_ID";

      ctx.reply(`Произошла неожиданная ошибка. Пожалуйста, обратитесь к Администрации к этим кодом ошибки: ${ errorId }`);
    };
  };
}