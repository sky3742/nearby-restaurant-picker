<script lang="ts">
	import { page } from '$app/state';
	import { getBrowserLocation } from '$lib/location';
	import type { Restaurant } from '../lib/types';

	let restaurants: Restaurant[] = [];
	let selected: Restaurant | null = null;

	// Receive data from server-side load
	$: data = page.data;
	$: restaurants = data.restaurants || [];

	function pickRandom() {
		if (restaurants.length === 0) return;
		const index = Math.floor(Math.random() * restaurants.length);
		selected = restaurants[index];
	}

	function refreshLocation() {
		getBrowserLocation()
			.then(({ lat, lon }) => {
				const params = new URLSearchParams(window.location.search);
				params.set('lat', lat.toString());
				params.set('lon', lon.toString());

				window.location.search = params.toString(); // triggers reload
			})
			.catch((err) => {
				console.error('Failed to refresh location:', err);
				alert('Unable to access location. Please check browser permission.');
			});
	}
</script>

<main class="mx-auto max-w-xl p-6 text-center">
	<h1 class="mb-4 text-2xl font-bold">🍽️ What to Eat Nearby</h1>

	{#if restaurants.length === 0}
		<p class="text-gray-500">Loading restaurants near you...</p>
	{:else}
		<button
			on:click={refreshLocation}
			class="ml-2 cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
		>
			🔄 Refresh Location
		</button>

		<button
			on:click={pickRandom}
			class="mb-4 cursor-pointer rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-600"
		>
			🎲 Pick Random
		</button>

		{#if selected}
			<div class="mb-4 rounded border bg-yellow-100 p-4 shadow">
				<h2 class="text-xl font-semibold">{selected.name}</h2>
				<p class="text-gray-700">Lat: {selected.lat}, Lon: {selected.lon}</p>
			</div>
		{/if}

		<ul class="grid gap-2">
			{#each restaurants as r}
				<li class="rounded border p-2 shadow hover:bg-gray-100">
					<strong>{r.name}</strong>
					<p class="text-sm text-gray-500">Lat: {r.lat}, Lon: {r.lon}</p>
				</li>
			{/each}
		</ul>
	{/if}
</main>
