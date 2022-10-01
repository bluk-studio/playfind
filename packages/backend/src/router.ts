import { createRouter } from './context';
import superjson from 'superjson';

// Importing all modules
import * as Modules from './modules';

const Router = createRouter()
  // Mergin all modules
  // (we need to do this manually, due to some issues
  // with typings)
  .merge('users.', Modules.UsersRouter)
  .merge('servers.', Modules.ServersRouter)
  .merge('admin.', Modules.AdminRouter)
  .transformer(superjson);

// Exporting
export { Router };
export type RouterDeclaration = typeof Router;