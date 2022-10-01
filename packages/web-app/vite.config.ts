import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths'

const config: UserConfig = {
	plugins: [
		tsconfigPaths({
			root: "."
		}),
		sveltekit()
	]
};

export default config;
