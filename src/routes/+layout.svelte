<script lang="ts">
	import { getBrowserLocation } from '$lib/location';
	import { onMount } from 'svelte';
	import '../app.css';

	let { children } = $props();

	onMount(async () => {
		const params = new URLSearchParams(window.location.search);
		const hasLat = params.has('lat');
		const hasLon = params.has('lon');

		if (!hasLat || !hasLon) {
			try {
				const { lat, lon } = await getBrowserLocation();
				params.set('lat', lat.toString());
				params.set('lon', lon.toString());

				window.location.search = params.toString(); // triggers reload
			} catch (err) {
				console.error('Failed to get location:', err);
				alert('Unable to access location. Please enable it in your browser.');
			}
		}
	});
</script>

{@render children()}
