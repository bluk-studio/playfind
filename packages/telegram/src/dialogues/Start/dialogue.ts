import { IDialogue } from "../IDialogue.interface";
import { Conversation } from "@grammyjs/conversations";
import { Context } from "../../context";

// Conversation type
type StartDialogueConversation = Conversation<Context>;

// Dialogue itself
export class StartDialogue implements IDialogue<StartDialogueConversation> {
  id = 'start-dialogue';

  async handler(conversation: StartDialogueConversation, ctx: Context) {
    // await ctx.reply("Hi there! What is your name?");
    // const { message } = await conversation.wait();
    // await ctx.reply(`Welcome to the chat, ${message.text}!`);
  }
};