import { Bot, MemorySessionStorage, session } from 'grammy';
import { Client } from './client';
import { environment } from './environments';
import { hydrateContext, hydrateApi } from '@grammyjs/hydrate';
import { Api, Context } from './context';
import { UserProfileMiddleware } from './middlewares';
import { createConversation, conversations } from '@grammyjs/conversations';
import { createInitialSessionData, SessionData } from './session';

// Importing dialogues, events and commands
import * as Dialogues from './dialogues';
import * as Commands from './commands';
import * as Events from './events';

// Creating our bot instance
const bot = new Bot<Context, Api>(environment.token);

// Plugins
bot.use(hydrateContext());
bot.api.config.use(hydrateApi());

bot.use(session({
  initial: createInitialSessionData,
  storage: new MemorySessionStorage(),
}))

bot.use(async (ctx, next) => {
  // Adding client to this context
  ctx.client = Client;

  next();
});

bot.use(conversations());
bot.use(UserProfileMiddleware());

// Listeners

// Registering all dialogues
Object.values(Dialogues).forEach((dialogueDeclaration) => {
  const Dialogue = new dialogueDeclaration();
  bot.use(createConversation(Dialogue.handler, Dialogue.id));
});

// Registering all commands
Object.values(Commands).forEach((commandDeclaration) => {
  const Command = new commandDeclaration();

  if (Command.commandName != null) bot.command(Command.commandName, Command.handler);
});

// And events...
Object.values(Events).forEach((eventDeclaration) => {
  const Event = new eventDeclaration();
  Event.registerEvent(bot);
});

bot.start({
  onStart() {
    console.log('Bot started');
  }
});