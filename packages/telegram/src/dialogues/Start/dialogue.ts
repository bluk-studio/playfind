import { IDialogue } from "../IDialogue.interface";
import { Conversation } from "@grammyjs/conversations";
import { Context } from "../../context";
import { IRegisteredUser } from "packages/backend/src/modules/Users/types";
import { Client } from "../../client";
import { MessageX } from "@grammyjs/hydrate/out/data/message";
import { InlineKeyboard, Keyboard } from "grammy";
import { AutoDeleteMessage } from "../../helpers";

// Conversation type
export type StartDialogueConversation = Conversation<Context>;

// Dialogue itself
export class StartDialogue implements IDialogue<StartDialogueConversation> {
  id = 'start-dialogue';

  async handler(conversation: StartDialogueConversation, ctx: Context) {
    // Имя
    // Никнейм (optional)
    // Дискорд
    // Возраст (optional)
    // Немного о себе (optional)
    // Сервера
    if (!ctx.session.profile.isRegistered) {
      // Conversation itself
      let lastCancellableMessage: MessageX;

      // Sending welcome messages
      await sendWelcomeMessage(ctx);

      // Asking user to input his name (required)
      await ctx.reply("Привет! Напиши своё имя!");
      const name = await waitForString(conversation, ctx);

      // ...Nickname (optional)
      lastCancellableMessage = await ctx.reply(`Отлично, ${name}! А теперь напиши свой игровой никнейм, если хочешь.`, {
        reply_markup: getCancellableReplyMarkup()
      });
      const nickname = await waitForString(conversation, ctx, { isCancellable: true });
      
      // ...Discord (required)
      // > Removing reply_markup from last message
      try {
        lastCancellableMessage.editReplyMarkup(new InlineKeyboard());
      } catch {};

      if (nickname == null) {
        await ctx.reply("Окей, ничего страшного. А теперь, пожалуйста, впишите ваш дискорд! Это обязательно, да");
      } else {
        await ctx.reply("Отлично! Теперь тебе надо написать свой дискорд, что бы с тобой могли легко связаться.");
      };

      const discord = await waitForString(conversation, ctx, { 
        regex: /^.{3,32}#[0-9]{4}$/,
        regexErrorMessage: "Пожалуйста, напишите ваш дискорд-тег в формате <буквы>#<цифры> (пример: cool_guy#1234)" 
      });

      // ...Age (optional)
      lastCancellableMessage = await ctx.reply(`Хорошо... Теперь тебе нужно скинуть твой возраст, если хочешь.`, {
        reply_markup: getCancellableReplyMarkup()
      });

      const age = await waitForNumber(conversation, ctx, { 
        isCancellable: true,
        min: 10,
        max: 60 
      });

      // ...About (optional)
      // > Removing reply_markup from last message
      try {
        lastCancellableMessage.editReplyMarkup(new InlineKeyboard());
      } catch {};

      lastCancellableMessage = await ctx.reply(`${ age == null ? "Без проблем, не сильно-то и хотелось этого узнавать..." : "Отлично!" } А теперь, опять же, если хочешь, можешь написатьт немного про себя. Эта информация будет показываться в твоей анкете, когда другие игроки будут искать себе напарника!`, {
        reply_markup: getCancellableReplyMarkup()
      });

      const about = await waitForString(conversation, ctx, { isCancellable: true });

      // Removing reply_markup
      try {
        lastCancellableMessage.editReplyMarkup(new InlineKeyboard())
      } catch {};

      // Registering this user...
      await Client.mutation('users.updateUser', {
        // Real fields
        id: ctx.from.id,
        isRegistered: true,
        name,
        nickname,
        about,
        age,
        discord,
      });

      // ...Servers (required)
      await ctx.reply("Отлично! Теперь тебе нужно выбрать сервера, на которых ты предпочитаешь играть и на которых ты хочешь найти себе напарников. Просто нажми на кнопку ниже.", {
        reply_markup: new Keyboard()
          .webApp("Выбрать сервера", "https://7240-13-95-202-71.ngrok.io/servers/choose")
          .resized(true),
      });

      // Leaving dialogue
      return;
    };
  }
};

// Helper functions
async function sendWelcomeMessage(ctx: Context) {
  await ctx.reply("Привет! Я бот который умеет там эээ сосать???");
};

function getCancellableReplyMarkup() {
  return {
    inline_keyboard: new InlineKeyboard()
      .text("Я не хочу вписывать это", "cancel")
      .inline_keyboard,
    one_time_keyboard: true,
  };
};

function waitForString(
  conversation: StartDialogueConversation,
  ctx: Context,
  options?: {
    isCancellable?: boolean,
    regex?: RegExp,
    regexErrorMessage?: string,
  },
): Promise<string | null> {
  return new Promise(async (resolve) => {
    while (true) {
      const update = await conversation.waitFor(options?.isCancellable ? ['message:text', 'callback_query'] : 'message:text');
      
      if (update.callbackQuery != undefined) {
        if (update.callbackQuery.data == "cancel") {
          // Answering callback query
          update.answerCallbackQuery();

          // Changing our reply_markup
          update.editMessageReplyMarkup({
            reply_markup: new InlineKeyboard(),
          });

          // Returning null
          return resolve(null)
        };
      } else if (update.message != undefined) {
        // @ts-ignore
        const text = update.message.text;
        
        if (options?.regex && !options.regex.test(text)) {
          // Sending error message
          AutoDeleteMessage(ctx, options.regexErrorMessage ?? "Вам нужно вписать именно строку.");

          continue;
        };

        return resolve(text);
      } else {
        AutoDeleteMessage(ctx, "Пожалуйста, впишите строку. Не картинку, не файл, а вот именно строку. Буковки");
      }
    };
  });
}

function waitForNumber(
  conversation: StartDialogueConversation,
  ctx: Context,
  options?: {
    isCancellable?: boolean,
    min?: number,
    max?: number
  },
): Promise<number | null> {
  return new Promise(async (resolve) => {
    while (true) {
      // Waiting for number
      const number: any = await waitForString(conversation, ctx, options);

      // Checking if number
      if (number == null) {
        return resolve(null);
      } else if (!isNaN(number)) {
        const parsedNumber = parseInt(number);

        if (options?.min || options?.max) {
          // Checking min
          if (options.min && number < options.min) {
            AutoDeleteMessage(ctx, `Ваше число должно быть меньше ${options.min}.`);
            continue;
          };

          // Checking max
          if (options.max && number > options.max) {
            AutoDeleteMessage(ctx, `Число не должно быть больше ${options.max}.`);
            continue;
          };
        };

        return resolve(parsedNumber)
      } else {
        // Sending error message
        AutoDeleteMessage(ctx, "Пожалуйста, укажите именно число.");
      };
    };
  });
};