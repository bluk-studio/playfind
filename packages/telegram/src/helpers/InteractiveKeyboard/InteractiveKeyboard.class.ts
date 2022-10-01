import { Bot, Keyboard } from "grammy";
import { BotInstance } from "../../bot";
import { Context } from "../../context";
import { ContextCallbackInstance, ContextCallbackType } from "../../helpers";

export class InteractiveKeyboard extends Keyboard {
  private bot: Bot = BotInstance;

  // Text with callback
  public textWithCallback(text: string, callback: (ctx: Context) => void): InteractiveKeyboard {
    // Adding this text
    this.text(text);

    // Adding this callback to this text
    ContextCallbackInstance.set(ContextCallbackType.INTERACTIVE_KEYBOARD, text, callback);

    // Returning this instance
    return this;
  };
};