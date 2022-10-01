import { Bot } from "grammy";
import { BotInstance } from "../bot";
import { Context } from "../context";

export enum ContextCallbackType {
  INTERACTIVE_KEYBOARD = 'INTERACTIVE_KEYBOARD',
};

type CallbackFunction = (ctx: Context) => void;

export class ContextCallbackSaver {
  // Callbacks list
  private callbacks: Map<string, { type: ContextCallbackType, fn: CallbackFunction }> = new Map();

  // Fetch callback
  public get(value: string): { type: ContextCallbackType, fn: CallbackFunction } {
    return this.callbacks.get(value);
  };

  // Add callback
  public set(type: ContextCallbackType, value: string, fn: CallbackFunction) {
    this.callbacks.set(value, {
      type,
      fn,
    });
  };
};

export const ContextCallbackInstance = new ContextCallbackSaver();