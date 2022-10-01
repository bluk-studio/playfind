import { Bot, MemorySessionStorage, session } from 'grammy';
import { hydrateContext, hydrateApi } from '@grammyjs/hydrate';
import { UserProfileMiddleware } from './middlewares';
import { createConversation, conversations } from '@grammyjs/conversations';
import { createInitialSessionData } from './session';
import { IMenu, IMenuType } from './menus/IMenu.interface';
import { BotInstance } from './bot';
import { Menu } from '@grammyjs/menu';
import { ContextCallbackInstance } from './helpers';
import { I18n } from "@grammyjs/i18n";

// Importing dialogues, events and commands
import * as Dialogues from './dialogues';
import * as Commands from './commands';
import * as Events from './events';
import * as Menus from './menus';
import { Context } from './context';

// Context Callbacks
BotInstance.use(async (ctx, next) => {
  ctx.callbacks = ContextCallbackInstance;
  await next();
});

// And menus
Object.values(Menus).forEach((MenuClass) => {
  if (MenuClass instanceof IMenu && MenuClass.type == IMenuType.INLINE) {
    BotInstance.use(MenuClass.getMenu() as Menu);
  };
});

// Plugins
BotInstance.use(hydrateContext());
BotInstance.api.config.use(hydrateApi());

BotInstance.use(session({
  initial: createInitialSessionData,
  storage: new MemorySessionStorage(),
}));

BotInstance.use(conversations());
BotInstance.use(UserProfileMiddleware());

// Listeners

// Registering all dialogues
Object.values(Dialogues).forEach((dialogueDeclaration) => {
  const Dialogue = new dialogueDeclaration();
  BotInstance.use(createConversation(Dialogue.handler, Dialogue.id));
});

// Registering all commands
Object.values(Commands).forEach((commandDeclaration) => {
  const Command = new commandDeclaration();

  if (Command.commandName != null) BotInstance.command(Command.commandName, Command.handler);
});

// And events...
Object.values(Events).forEach((eventDeclaration) => {
  const Event = new eventDeclaration();
  Event.registerEvent(BotInstance);
});

// Internalization
const i18n = new I18n<Context>({
  defaultLocale: "ru",
  useSession: true, // whether to store user language in session
  directory: "locales", // Load all translation files from locales/.
});

BotInstance.use(i18n);

BotInstance.start({
  onStart() {
    console.log('Bot started');
  }
});