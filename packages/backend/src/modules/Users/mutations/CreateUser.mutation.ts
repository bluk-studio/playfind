import { inferProcedureInput } from "@trpc/server";
import { Context } from "packages/backend/src/context";
import { RouterDeclaration } from "packages/backend/src/router";
import { IUnregisteredUser } from "../types";

// Input type
type Input = Exclude<inferProcedureInput<RouterDeclaration['_def']['mutations']['users.createUser']>, void>;

// Function itself
export async function CreateUser(input: Input, { database }: Context): Promise<IUnregisteredUser> {
  // Creating new Unregistered user
  const user = await database.user.create({
    data: {
      profileId: input.id,
      isRegistered: false,
    }
  });

  // Returning user
  return {
    id: user.profileId,
    isRegistered: false,
  };
};