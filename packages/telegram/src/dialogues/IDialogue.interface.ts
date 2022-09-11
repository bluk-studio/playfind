import { Context } from "../context";

export interface IDialogue<T> {
  id: string,

  handler(conversation: T, ctx: Context): void,
};