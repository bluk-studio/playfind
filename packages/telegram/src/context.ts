import { Api as OriginalApi, Bot, Context as OriginalContext, SessionFlavor } from 'grammy';
import { HydrateFlavor, HydrateApiFlavor } from '@grammyjs/hydrate';
import { ConversationFlavor } from '@grammyjs/conversations';
import { SessionData } from './session';
import { Client } from './client';

export type Context = 
  HydrateFlavor<OriginalContext> & 
  SessionFlavor<SessionData> &
  ConversationFlavor & 
  { client: typeof Client };

export type Api = HydrateApiFlavor<OriginalApi>;