import { inferProcedureInput, TRPCError } from "@trpc/server";
import { Context } from "packages/backend/src/context";
import { RouterDeclaration } from "packages/backend/src/router";
import { IServer } from "../../Servers/types";
import { Client } from "../../../client";

type Input = Exclude<inferProcedureInput<RouterDeclaration['_def']['mutations']['users.updateUserServers']>, void>;

export async function UpdateUserServers(input: Input, { database }: Context): Promise<Array<IServer>> {
  // Getting user with this id
  const user = await findUniqueUser(input.id, database);

  if (!user) throw new TRPCError({ code: "NOT_FOUND", message: "user/not_found" });
  
  // Removing old ServerConnections...
  const oldServerConnections = await findUniqueUser(input.id, database).servers();
  oldServerConnections.forEach((connection) => {
    if (!input.serverIds.includes(connection.serverId)) {
      database.serverConnection.delete({
        where: {
          id: connection.id
        },
      });
    } else {
      input.serverIds.splice(input.serverIds.indexOf(connection.id), 1);
    };
  });

  // ...and adding new
  await database.serverConnection.createMany({
    data: input.serverIds.map((serverId) => {
        return {
          serverId,
          userId: user.id,
        }
      }),
    }
  );

  // Fetching and returning user's userIds
  const updatedConnections = await findUniqueUser(input.id, database).servers();
  return await database.server.findMany({
    where: {
      id: {
        in: updatedConnections.map((conn) => conn.id),
      }
    }
  });
};

// Helper functions
function findUniqueUser(profileId: number, database: typeof Client) {
  return database.user.findUnique({
    where: {
      profileId,
    },
  });
};