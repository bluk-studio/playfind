import { createRouter } from '../../context';
import * as yup from 'yup';

// Exporting module information
export const UsersRouter = createRouter()
  .query('getUser', {
    input: yup.object({
      text: yup.string().required().default("Default string"),
    }),
    async resolve({ input }) {
      console.log("Received getUser request with input:", input);

      return { id: 120, name: 'Bilbo', input };
    }
  });