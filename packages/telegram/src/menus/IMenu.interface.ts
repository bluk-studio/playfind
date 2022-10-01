import { Context } from "../context";
import { Menu } from "@grammyjs/menu";
import { Keyboard } from "grammy";
import { SharableContext } from "../helpers";

export enum IMenuType {
  INLINE = 'INLINE',
  FULL_KEYBOARD = 'FULL_KEYBOARD'
};

export abstract class IMenu<T> {
  public abstract type: IMenuType;

  public abstract getMenu(ctx?: Context): T extends Keyboard ? Keyboard : Menu;
  
  // Abstract
  public abstract buildText(ctx: Context): string;

  // With default logic
  replyWithMenu(context: SharableContext | Context): void {
    const ctx = context instanceof SharableContext ? context.getContext() : context;

    // Sending this menu with regards to it's type
    if (this.type == IMenuType.INLINE) {
      ctx.reply(this.buildText(ctx), { reply_markup: this.getMenu(ctx) });
    } else {
      ctx.reply(this.buildText(ctx), { reply_markup: this.getMenu(ctx) });
    };
  };
};