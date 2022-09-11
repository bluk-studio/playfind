import { inferAsyncReturnType, inferProcedureOutput } from "@trpc/server";
import { RouterDeclaration } from "../client";

export interface SessionData {
  pizzaCount: number,
  profile?: inferProcedureOutput<RouterDeclaration['_def']['queries']['users.getUser']>
};