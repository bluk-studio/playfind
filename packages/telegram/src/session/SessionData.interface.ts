import { inferProcedureOutput } from "@trpc/server";
import { RouterDeclaration } from "../client";
import { StartDialogueConversation } from "../dialogues";

export interface SessionData {
  conversations: {
    startConversation?: StartDialogueConversation,
  }
  profile?: inferProcedureOutput<RouterDeclaration['_def']['queries']['users.getUser']>,
  __language_code?: string;
};