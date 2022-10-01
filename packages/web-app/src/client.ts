import type { RouterDeclaration } from "../../backend/src/router";
import { createTRPCClient } from '@trpc/client';
import { environment } from "./environments";
import superjson from 'superjson';

export const Client = createTRPCClient<RouterDeclaration>({
  url: environment.backend_url,
  transformer: superjson,
});