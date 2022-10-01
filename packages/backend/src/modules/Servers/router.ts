import { createRouter } from "../../context";
import { GetAllServers, GetServer } from "./queries";
import { IServer } from "./types";
import * as yup from 'yup';


export const ServersRouter = createRouter()
  .query('getAllServers', {
    resolve({ ctx }): Promise<Array<IServer>> {
      return GetAllServers(ctx);
    },
  })
  
  .query('getServer', {
    input: yup.number().required(),
    resolve({ input, ctx }): Promise<IServer> {
      return GetServer(input, ctx);
    },
  });