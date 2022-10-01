import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths'
import icons from 'unplugin-icons/vite';

const config: UserConfig = {
	plugins: [
		tsconfigPaths({
			root: "."
		}),
		icons({
			compiler: 'svelte',
		}),
		sveltekit()
	]
};

export default config;
