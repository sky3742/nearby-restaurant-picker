import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			devOptions: {
				suppressWarnings: true, // suppress warnings during development
				enabled: true // enable during development
			},
			manifest: {
				name: 'Nearby Restaurant Picker',
				short_name: 'EatWhat',
				description: 'Find and pick nearby food places with ease.',
				theme_color: '#1f2937',
				background_color: '#1f2937',
				display: 'standalone',
				start_url: '/',
				icons: [
					{
						src: '/android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			}
		})
	]
});
