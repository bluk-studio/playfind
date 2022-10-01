import { inferProcedureInput } from "@trpc/server";
import { Context } from "packages/backend/src/context";
import { RouterDeclaration } from "packages/backend/src/router";
import { IServer } from "../types";

// Input type
type Input = Exclude<inferProcedureInput<RouterDeclaration['_def']['queries']['servers.getServer']>, void>;

// Query itself
export async function GetServer(input: Input, ctx: Context): Promise<IServer> {
  return {
    id: "test-id-4",
    name: "test server",
    description: "Test description",
    tags: ["Test tag"],
    logotype: "",
  };
};