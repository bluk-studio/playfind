import { Bot } from 'grammy';
import { Client } from './client';
import { environment } from './environments';

// Creating our bot instance
const bot = new Bot(environment.token);

// 
bot.on('message', async (message) => {
  message.reply("Hello there!");
});

bot.start();