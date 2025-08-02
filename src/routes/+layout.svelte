<script lang="ts">
	import { refreshLocation } from '$lib/utils';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { onMount } from 'svelte';
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import { pwaInfo } from 'virtual:pwa-info';
	import '../app.css';

	let { children } = $props();

	injectAnalytics({ debug: false });
	injectSpeedInsights({ debug: false });

	onMount(() => {
		const params = new SvelteURLSearchParams(window.location.search);
		const hasLat = params.has('lat');
		const hasLon = params.has('lon');

		if (!hasLat || !hasLon) refreshLocation();
	});

	onMount(async () => {
		if (pwaInfo) {
			const { registerSW } = await import('virtual:pwa-register');
			registerSW();
		}
	});

	const webManifest = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '');
</script>

<svelte:head>
	<title>What To Eat</title>
	<meta name="description" content="Find nearby restaurants and pick a random one to eat at." />
	{@html webManifest}
</svelte:head>

{@render children()}
