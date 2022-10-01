import { inferProcedureInput } from "@trpc/server";
import { Context } from "packages/backend/src/context";
import { RouterDeclaration } from "packages/backend/src/router";
import { GetUser } from "../queries";
import { IUser, IRegisteredUser } from "../types";

type Input = Exclude<inferProcedureInput<RouterDeclaration['_def']['mutations']['users.updateUser']>, void>;

export async function UpdateUser(input: Input, ctx: Context): Promise<IRegisteredUser> {
  const { database } = ctx;
  
  // Updating user
  const user = await database.user.update({
    where: {
      profileId: input.id
    },
    data: {
      about: input.about,
      age: input.age,
      isRegistered: input.isRegistered,
      name: input.name,
      nickname: input.nickname,
    }
  });

  // Adding discord connection
  const discord = input.discord ?
    (await database.discordConnection.upsert({
      where: {
        userId: user.id,
      },
      // Create data
      create: {
        userId: user.id,
        discordTag: input.discord
      },
      // Update data
      update: {
        userId: user.id,
        discordTag: input.discord,
      }
    }))
    : (await database.discordConnection.findUniqueOrThrow({
      where: {
        userId: user.id,
      },
    }));

  return await GetUser(input.id, ctx) as IRegisteredUser;
};