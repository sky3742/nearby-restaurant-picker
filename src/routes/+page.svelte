<script lang="ts">
	import { goto } from '$app/navigation';
	import { getBrowserLocation } from '$lib/location';
	import { favorites } from '$lib/store/favorites';
	import type { Restaurant } from '$lib/types';

	export let data: {
		restaurants: Restaurant[];
		distance: number;
	};

	let picked: Restaurant;
	let addressInput = '';
	let showFavouritesOnly = false;
	let showOnlyOpen = true;

	$: restaurants = data.restaurants
		.filter((r) => !showOnlyOpen || r.isOpen)
		.filter((r) => !showFavouritesOnly || $favorites.includes(r.id));

	function pickRandom() {
		if (!restaurants.length) return;
		const randomIndex = Math.floor(Math.random() * restaurants.length);
		picked = restaurants[randomIndex];
	}

	function refreshLocation() {
		getBrowserLocation()
			.then(({ lat, lon }) => {
				const params = new URLSearchParams(window.location.search);
				params.set('lat', lat.toString());
				params.set('lon', lon.toString());
				goto(`?${params.toString()}`);
			})
			.catch((err) => {
				console.error('Failed to refresh location:', err);
				alert('Unable to access location. Please check browser permission.');
			});
	}

	function useCustomAddress() {
		if (!addressInput) return;
		const q = encodeURIComponent(addressInput);
		fetch(`https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1`)
			.then((res) => res.json())
			.then(([place]) => {
				if (!place) return alert('Address not found');
				const params = new URLSearchParams(window.location.search);
				params.set('lat', place.lat);
				params.set('lon', place.lon);
				goto(`?${params.toString()}`);
			});
	}

	function toggleFavorite(id: string) {
		if ($favorites.includes(id)) {
			favorites.set($favorites.filter((f) => f !== id));
		} else {
			favorites.set([...$favorites, id]);
		}
	}

	function getMapLink(lat: number, lon: number) {
		const isMobile = /iPhone|Android/i.test(navigator.userAgent);
		if (isMobile) {
			return `geo:${lat},${lon}`;
		}
		return `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
	}
</script>

<div class="mx-auto max-w-2xl p-4">
	<h1 class="mb-4 text-2xl font-bold">🍜 Nearby Restaurant Picker</h1>

	<div class="mb-4">
		<label for="distance" class="mb-1 block font-medium">Distance (meters)</label>
		<input
			id="distance"
			type="number"
			bind:value={data.distance}
			on:change={() => {
				const params = new URLSearchParams(window.location.search);
				params.set('distance', data.distance.toString());
				goto(`?${params.toString()}`);
			}}
			class="w-full rounded border p-2"
		/>
	</div>

	<div class="mb-4">
		<label for="address" class="mb-1 block font-medium">Or enter address</label>
		<div class="flex gap-2">
			<input
				id="address"
				bind:value={addressInput}
				placeholder="e.g. Mid Valley KL"
				class="flex-1 rounded border p-2"
			/>
			<button on:click={useCustomAddress} class="rounded bg-purple-500 px-4 py-2 text-white">
				📍 Go
			</button>
		</div>
	</div>

	<div class="mb-4 grid gap-2 md:grid-cols-2">
		<button on:click={pickRandom} class="rounded bg-green-600 px-4 py-2 text-white">
			🎲 Pick Random
		</button>
		<button on:click={refreshLocation} class="rounded bg-blue-600 px-4 py-2 text-white">
			🔄 Refresh Location
		</button>
		<label class="flex items-center gap-1">
			<input type="checkbox" bind:checked={showFavouritesOnly} />
			Favourites only
		</label>
		<label class="inline-flex items-center space-x-2">
			<input type="checkbox" bind:checked={showOnlyOpen} />
			<span>Show only open restaurants</span>
		</label>
	</div>

	{#if picked}
		<div
			class="mb-4 flex flex-col items-center justify-between rounded bg-yellow-100 p-4 md:flex-row"
		>
			<h2 class="text-xl font-semibold">
				<a href={getMapLink(picked.lat, picked.lon)} target="_blank" rel="noopener noreferrer">
					🎉 You should try: {picked.name}
				</a>
			</h2>
			<span class="text-sm text-nowrap text-gray-500">{picked.distance.toFixed(2)} km away</span>
		</div>
	{/if}

	<div class="grid gap-2">
		{#each restaurants as r}
			<div class="rounded border p-2 hover:bg-gray-50">
				<div class="flex items-center justify-between">
					<a href={getMapLink(r.lat, r.lon)} target="_blank" class="flex grow items-center gap-2">
						<span
							class={`size-2 shrink-0 rounded-full ${r.isOpen ? 'bg-green-500' : r.isOpen === false ? 'bg-red-500' : 'bg-gray-400'}`}
						></span>
						<strong>{r.name}</strong>
					</a>
					<div class="flex gap-1">
						<p class="text-sm text-nowrap text-gray-500">{r.distance.toFixed(2)} km away</p>
						<button on:click={() => toggleFavorite(r.id)} class="text-yellow-500">
							{$favorites.includes(r.id) ? '★' : '☆'}
						</button>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
