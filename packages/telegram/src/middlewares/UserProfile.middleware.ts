import { NextFunction } from "grammy";
import { Context } from "../context";

export function UserProfileMiddleware() {
  return async function UserProfileMiddleware(ctx: Context, next: NextFunction) {
    // Trying to fetch user profile
    const response = await ctx.client.query('users.getUser', ctx.from.id);

    // Updating our current session
    ctx.session.profile = response;
  
    next();
  };
}