import { Context } from "../../context";
import { ICommand } from "../ICommand.interface";

export class StartCommand implements ICommand {
  commandName = "start";
  
  async handler(ctx: Context) {
    // Determining if we need to initialize our StartDialogue
    // or to show main menu
    if (!ctx.session.profile.isRegistered) {
      ctx.conversation.enter('start-dialogue');
    } else {
      // Opening menu to this user
      ctx.reply("main menu");
    };
  };
};