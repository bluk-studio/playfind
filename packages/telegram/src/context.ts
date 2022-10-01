import { Api as OriginalApi, Bot, Context as OriginalContext, SessionFlavor } from 'grammy';
import { HydrateFlavor, HydrateApiFlavor } from '@grammyjs/hydrate';
import { ConversationFlavor } from '@grammyjs/conversations';
import { SessionData } from './session';
import { ContextCallbackSaver } from './helpers';
import { I18nFlavor } from "@grammyjs/i18n";

export type Context = 
  HydrateFlavor<OriginalContext> & 
  SessionFlavor<SessionData> &
  ConversationFlavor & { callbacks: ContextCallbackSaver } &
  I18nFlavor;

export type Api = HydrateApiFlavor<OriginalApi>;