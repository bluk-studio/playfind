import { createRouter } from '../../context';
import * as yup from 'yup';
import { IUser, IRegisteredUser, IUnregisteredUser } from './types';
import { CreateUser, UpdateUser } from './mutations';
import { GetUser } from './queries';
import { IServer } from '../Servers/types';
import { UpdateUserServers } from './mutations/UpdateUserServers.mutation';

// Exporting module information
export const UsersRouter = createRouter()
  // Queries
  .query('getUser', {
    input: yup.number().required(),
    resolve({ input, ctx }): Promise<IUser> {
      return GetUser(input, ctx);
    }
  })

  // Mutations
  .mutation('updateUser', {
    input: yup.object({
      id: yup.number().required(),
      isRegistered: yup.boolean().required(),
      name: yup.string().nullable(),
      nickname: yup.string().nullable(),
      age: yup.number().nullable().positive().min(10).max(60),
      discord: yup.string().nullable().matches(/^.{3,32}#[0-9]{4}$/),
      about: yup.string().nullable()
    }),
    resolve({ input, ctx }): Promise<IRegisteredUser> {
      return UpdateUser(input, ctx);
    },
  })

  .mutation('updateUserServers', {
    input: yup.object({
      id: yup.number().required(),
      serverIds: yup.array(yup.string())
    }),
    resolve({ input, ctx }): Promise<Array<IServer>> {
      return UpdateUserServers(input, ctx);
    }
  })

  .mutation('createUser', {
    input: yup.object({
      id: yup.number().required(),
    }),
    resolve({ input, ctx }): Promise<IUnregisteredUser> {
      return CreateUser(input, ctx);
    },
  });