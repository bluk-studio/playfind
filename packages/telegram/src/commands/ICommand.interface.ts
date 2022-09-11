import { Context } from "../context";

export interface ICommand {
  commandName?: string;
  commandRegex?: RegExp;
  handler(ctx: Context): void;
};