import { SessionData } from "../SessionData.interface";

export function createInitialSessionData(): SessionData {
  return {
    pizzaCount: 0,
  };
};