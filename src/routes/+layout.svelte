<script lang="ts">
	import { refreshLocation } from '$lib/utils';
	import { onMount } from 'svelte';
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import { pwaInfo } from 'virtual:pwa-info';
	import '../app.css';

	let { children } = $props();

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
</script>

<svelte:head>
	<title>What To Eat</title>
	<meta name="description" content="Find nearby restaurants and pick a random one to eat at." />

	{#if pwaInfo?.webManifest.href}
		<link rel="manifest" href={pwaInfo.webManifest.href} />
	{/if}
</svelte:head>

{@render children()}
