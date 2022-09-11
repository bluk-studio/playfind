import { Bot, FilterQuery } from "grammy";
import { Api, Context } from "../../context";
import { IEvent } from "../IEvent.interface";

export class StartDialogueStarted implements IEvent {
  registerEvent(bot: Bot<Context, Api>) {
    bot.on('message', async (ctx) => {
      // Checking if user is registered or no...
      if (!ctx.session.profile.isRegistered) {
        ctx.deleteMessage();

        // Starting conversation.
        if (!(await ctx.conversation.active())['start-dialogue']) {
          ctx.conversation.enter('start-dialogue');
        }
      };
    });
  };
};