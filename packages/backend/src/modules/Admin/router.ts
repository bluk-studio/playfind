import { createRouter } from "../../context";
import { CheckAdminToken } from './queries';
import * as yup from 'yup';

export const AdminRouter = createRouter()
  .query('checkAdminToken', {
    input: yup.string(),
    async resolve({ input, ctx }): Promise<boolean> {
      return CheckAdminToken(input);
    }
  })

  // 
  // Users-related
  // queries and mutations

  // 
  // Servers-related
  // queries and mutations
