import * as express from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { Router } from './router';
import { createContext } from './context';

// Creating express application
const app = express();

// ...with settings

// CORS and other small things

// Logger
app.use((req, _res, next) => {
  // Logging information about this request
  console.log("Received request", req.method, req.path, req.body ?? req.query);

  next();
});

// Plugging in our trpc server
app.use('/',
  createExpressMiddleware({
    router: Router,
    createContext,
  }),
);

// Starting our application
const port = process.env.port || 3001;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
