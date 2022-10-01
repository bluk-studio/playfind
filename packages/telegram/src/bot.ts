import { Bot } from "grammy";
import { Api, Context } from "./context";
import { environment } from "./environments";

// Creating our bot instance
const BotInstance = new Bot<Context, Api>(environment.token);

export { BotInstance };