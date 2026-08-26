<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { RestaurantListItem, RestaurantPickerHeader } from '$lib/components';
	import { getRestaurants } from '$lib/apis';
	import { favorites, isLoading } from '$lib/stores';
	import type { Restaurant } from '$lib/types';
	import { refreshLocation } from '$lib/utils';
	import { SvelteURLSearchParams } from 'svelte/reactivity';

	let restaurants = $state<Restaurant[]>([]);
	let distance = $state(1000);
	let showFavouritesOnly = $state(false);
	let showOnlyOpen = $state(false);

	let filtered = $derived(
		restaurants
			.filter((r) => !showOnlyOpen || r.isOpen)
			.filter((r) => !showFavouritesOnly || $favorites.includes(r.id))
			.sort((a, b) => {
				if (a.isOpen === b.isOpen) return a.distance - b.distance;
				if (a.isOpen === true) return -1;
				if (b.isOpen === true) return 1;
				return 0;
			})
	);

	$effect(() => {
		const url = $page.url;
		const params = url.searchParams;
		const lat = parseFloat(params.get('lat') || '0');
		const lon = parseFloat(params.get('lon') || '0');
		distance = parseInt(params.get('distance') ?? '1000');

		if (!lat || !lon) {
			restaurants = [];
			return;
		}

		isLoading.set(true);
		getRestaurants(lat, lon, distance)
			.then((r) => (restaurants = r))
			.catch(() => (restaurants = []))
			.finally(() => isLoading.set(false));
	});

	function useCustomAddress(addressInput: string) {
		if (!addressInput) return;
		isLoading.set(true);

		fetch(
			`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(addressInput)}&format=json&limit=1`
		)
			.then((res) => res.json())
			.then(([place]) => {
				if (!place) return alert('Address not found');
				const params = new SvelteURLSearchParams(window.location.search);
				params.set('lat', place.lat);
				params.set('lon', place.lon);
				return goto(`?${params.toString()}`, { replaceState: true });
			})
			.finally(() => isLoading.set(false));
	}

	async function distanceChange(newDistance: number) {
		const params = new SvelteURLSearchParams(window.location.search);
		params.set('distance', newDistance.toString());
		await goto(`?${params.toString()}`, { replaceState: true });
	}

	function toggleFavorite(id: string) {
		favorites.set(
			$favorites.includes(id) ? $favorites.filter((f) => f !== id) : [...$favorites, id]
		);
	}
</script>

<div class="mx-auto max-w-2xl p-4">
	<RestaurantPickerHeader
		{showFavouritesOnly}
		{showOnlyOpen}
		restaurants={filtered}
		{refreshLocation}
		{useCustomAddress}
		{distanceChange}
		{distance}
		onToggleFavourites={(val) => (showFavouritesOnly = val)}
		onToggleOpen={(val) => (showOnlyOpen = val)}
	/>

	{#if $isLoading}
		<div class="flex items-center justify-center">
			<span class="loading loading-md loading-spinner text-primary"></span>
		</div>
	{:else}
		<div class="grid gap-2">
			{#each filtered as restaurant (restaurant.id)}
				<RestaurantListItem {restaurant} {toggleFavorite} />
			{/each}
		</div>
	{/if}
</div>
