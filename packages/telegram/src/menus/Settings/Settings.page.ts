import { Menu } from "@grammyjs/menu";
import { Context } from "../../context";
import { SharableContext } from "../../helpers";
import { IMenu, IMenuType } from "../IMenu.interface";
import { MainPage } from "../Main";

class SettingsPageClass extends IMenu<Menu> {
  type = IMenuType.INLINE;

  private menu = new Menu("settings-menu")
    .text("Вернуться", (ctx) => {
      MainPage.replyWithMenu(new SharableContext(ctx));
    })

  getMenu() {
    return this.menu;
  };

  buildText(ctx: Context): string {
    return "Test text!";
  };
};

export const SettingsPage = new SettingsPageClass();