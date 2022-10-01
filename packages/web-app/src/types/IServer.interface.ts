import type { inferProcedureOutput } from "@trpc/server";
import type { RouterDeclaration } from "../../../backend/src/router";

export type Server = inferProcedureOutput<RouterDeclaration['_def']['queries']['servers.getServer']>;