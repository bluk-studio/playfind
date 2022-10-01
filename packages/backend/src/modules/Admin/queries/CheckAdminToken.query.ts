import { inferProcedureInput } from "@trpc/server";
import { RouterDeclaration } from "packages/backend/src/router";
import { AdminTokens } from "../config";

// Query input type
type Input = Exclude<inferProcedureInput<RouterDeclaration['_def']['queries']['admin.checkAdminToken']>, void>;

// Exporting query function
export async function CheckAdminToken(input: Input): Promise<boolean> {
  if (AdminTokens.includes(input)) {
    return true;
  };

  return false;
};