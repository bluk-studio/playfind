import { Bot, FilterQuery } from 'grammy';
import { Api, Context } from '../context';

export interface IEvent {
  registerEvent(bot: Bot<Context, Api>): void,
};