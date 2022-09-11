import { createRouter } from './context';
import superjson from 'superjson';

// Importing all modules
import * as Modules from './modules';

const Router = createRouter()
  // Mergin all modules
  // (we need to do this manually, due to some issues
  // with typings)
  .merge('users.', Modules.UsersRouter)
  .transformer(superjson);

// Exporting
export { Router };
export type RouterDeclaration = typeof Router;