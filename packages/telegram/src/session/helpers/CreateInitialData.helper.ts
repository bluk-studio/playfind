import { SessionData } from "../SessionData.interface";

export function createInitialSessionData(): SessionData {
  return {
    conversations: {},
  };
};