import { Bot } from "grammy";
import { Api, Context } from "../../context";
import { ContextCallbackType } from "../../helpers";
import { IEvent } from "../IEvent.interface";

export class OnMessageEvent implements IEvent {
  registerEvent(bot: Bot<Context, Api>) {
    console.log("Registering OnMessageEvent event. (on_message event)");

    bot.on('message', async (ctx) => {
      // Checking if user is registered or no...
      if (!ctx.session.profile.isRegistered) {
        await ctx.deleteMessage();

        // Starting conversation.
        if (!(await ctx.conversation.active())['start-dialogue']) {
          ctx.conversation.enter('start-dialogue');
        }
      } else {
        // Checking this message with ContextCallback
        const message = ctx.message.text;
        if (ctx.callbacks.get(message) != null) {
          // Triggering this callback function
          const callback = ctx.callbacks.get(message);

          if (callback.type == ContextCallbackType.INTERACTIVE_KEYBOARD) {
            // Removing keyboard
            ctx.reply("Загружаем...", { 
              disable_notification: true,
              reply_markup: {
                remove_keyboard: true
              }
            })
            .then((message) => message.delete());
          };

          // Triggering callback function
          callback.fn(ctx);
        };
      };
    });
  };
};