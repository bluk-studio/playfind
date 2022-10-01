import { WebApp } from './src/telegram.types';

declare global {
  interface Window {
    Telegram: {
      WebApp: WebApp
    },
  }
}