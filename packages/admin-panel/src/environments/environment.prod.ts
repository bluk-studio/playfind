import * as dotenv from 'dotenv';

// Initializing dotenv
dotenv.config();

export const environment = {
  production: true,
  token: process.env.TELEGRAM_TOKEN,
  backend_url: "https://apis.odzi.dog/playfind/v1"
};
