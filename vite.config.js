import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	base: '/builder/',
	plugins: [svelte()],
	optimizeDeps: {
		exclude: [
			'svelte-codemirror-editor',
			'codemirror',
			'@codemirror/lang-json',
			'@codemirror/legacy-modes',
			'@codemirror/language',
			'@codemirror/state',
			'@codemirror/view'
		]
	},
	build: {
		outDir: 'dist',
		sourcemap: true
	},
	server: {
		port: 5000,
		open: true
	}
});
