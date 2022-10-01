import { TRPCError } from "@trpc/server";
import { Context } from "packages/backend/src/context";
import { IUser } from "../types";

// Input type
type Input = number;

// Function itself
export async function GetUser(input: Input, ctx: Context): Promise<IUser> {
  // Getting user from database...
  const user = await ctx.database.user.findUnique({ where: { profileId: input } });
  const discord = await ctx.database.user.findUnique({ where: { profileId: input } }).discord();

  if (user == null) {
    throw new TRPCError({ code: 'NOT_FOUND', message: `user/not_found (${input}})` });
  } else {
    // Returning user
    if (user.isRegistered) {
      const connectedServers = await ctx.database.user.findUnique({
        where: {
          profileId: input,
        }
      }).servers();
      
      return {
        id: user.profileId,
        isRegistered: true,

        name: user.name,
        nickname: user.nickname,
        age: user.age,
        discord: discord.discordTag,
        about: user.about,

        servers: await ctx.database.server.findMany({ where: { id: { in: connectedServers.map((conn) => conn.id) } } }),
      };
    } else {
      return {
        id: user.profileId,
        isRegistered: false,
      }
    };
  };
};