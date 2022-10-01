import { IServer } from "../../Servers/types";

export interface IUnregisteredUser {
  id: number,
  isRegistered: false,
};

export interface IRegisteredUser {
  id: number,
  isRegistered: true,

  // User information
  name: string,
  nickname?: string,
  discord: string,
  age?: number,
  about?: string,

  servers: Array<IServer>
}

export type IUser = IUnregisteredUser | IRegisteredUser;