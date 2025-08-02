<script lang="ts">
	import { goto } from '$app/navigation';
	import { RestaurantListItem, RestaurantPickerHeader } from '$lib/components';
	import { favorites, isLoading } from '$lib/stores';
	import type { Restaurant } from '$lib/types';
	import { refreshLocation } from '$lib/utils';
	import { SvelteURLSearchParams } from 'svelte/reactivity';

	export let data: {
		restaurants: Restaurant[];
		distance: number;
	};

	let showFavouritesOnly = false;
	let showOnlyOpen = false;

	$: restaurants = data.restaurants
		.filter((r) => !showOnlyOpen || r.isOpen)
		.filter((r) => !showFavouritesOnly || $favorites.includes(r.id))
		.sort((a, b) => {
			if (a.isOpen === b.isOpen) return a.distance - b.distance;
			if (a.isOpen === true) return -1;
			if (b.isOpen === true) return 1;
			return 0;
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

	async function distanceChange(distance: number) {
		isLoading.set(true);
		const params = new SvelteURLSearchParams(window.location.search);
		params.set('distance', distance.toString());
		await goto(`?${params.toString()}`, { replaceState: true });
		isLoading.set(false);
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
		{restaurants}
		{refreshLocation}
		{useCustomAddress}
		{distanceChange}
		distance={data.distance}
		onToggleFavourites={(val) => (showFavouritesOnly = val)}
		onToggleOpen={(val) => (showOnlyOpen = val)}
	/>

	{#if $isLoading}
		<div class="flex items-center justify-center">
			<span class="loading loading-md loading-spinner text-primary"></span>
		</div>
	{:else}
		<div class="grid gap-2">
			{#each restaurants as restaurant (restaurant.id)}
				<RestaurantListItem {restaurant} {toggleFavorite} />
			{/each}
		</div>
	{/if}
</div>
