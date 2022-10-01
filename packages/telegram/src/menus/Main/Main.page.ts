import { Keyboard } from "grammy";
import { Context } from "../../context";
import { InteractiveKeyboard, SharableContext } from "../../helpers";
import { IMenu, IMenuType } from "../IMenu.interface";
import { SettingsPage } from "../Settings";

class MainPageClass extends IMenu<Keyboard> {
  type = IMenuType.FULL_KEYBOARD;

  getMenu(ctx: Context) {
    return new InteractiveKeyboard()
      .textWithCallback(ctx.t("settings-menu"), (ctx) => {
        SettingsPage.replyWithMenu(new SharableContext(ctx));
      });;
  };

  buildText(ctx: Context): string {
    return ctx.t("main-page");
  };
};

export const MainPage = new MainPageClass();