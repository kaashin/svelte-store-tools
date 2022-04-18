import adapter from '@sveltejs/adapter-auto';
import path from 'path';
import { mdsvex } from "mdsvex";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx'],
	preprocess: [
		mdsvex({
			extensions: ['.md', '.sdx'],
			layout: {
				_: "./src/routes/__layout.svelte",
			}
		})
	],
	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					$components: path.resolve('./src/components'),
					$utils: path.resolve('./src/utils'),
					$stores: path.resolve('./src/stores'),
					$lib: path.resolve('./src/lib')
				}
			}
		}
	}
};

export default config;
