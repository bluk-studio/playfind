import { createRouter } from '../../context';
import * as yup from 'yup';
import { IUser } from './types';

// Exporting module information
export const UsersRouter = createRouter()
  .query('getUser', {
    input: yup.number().required(),
    async resolve({ input }): Promise<IUser> {
      // todo
      // Fetching user information and then returning it

      return {
        id: input,
        isRegistered: false,
      }
    }
  });