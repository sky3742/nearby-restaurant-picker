<script lang="ts">
	import { goto } from '$app/navigation';
	import { PickedCard, RestaurantListItem, RestaurantPickerHeader } from '$lib/components';
	import { favorites } from '$lib/stores';
	import type { Restaurant } from '$lib/types';
	import { getBrowserLocation } from '$lib/utils';

	export let data: {
		restaurants: Restaurant[];
		distance: number;
	};

	let picked: Restaurant;
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

	function pickRandom() {
		if (!restaurants.length) return;
		picked = restaurants[Math.floor(Math.random() * restaurants.length)];
	}

	function refreshLocation() {
		getBrowserLocation()
			.then(({ lat, lon }) => {
				const params = new URLSearchParams(window.location.search);
				params.set('lat', lat.toString());
				params.set('lon', lon.toString());
				goto(`?${params.toString()}`, { replaceState: true });
			})
			.catch((err) => {
				console.error('Location error:', err);
				alert('Check your browser permissions.');
			});
	}

	function useCustomAddress(addressInput: string) {
		if (!addressInput) return;
		fetch(
			`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(addressInput)}&format=json&limit=1`
		)
			.then((res) => res.json())
			.then(([place]) => {
				if (!place) return alert('Address not found');
				const params = new URLSearchParams(window.location.search);
				params.set('lat', place.lat);
				params.set('lon', place.lon);
				goto(`?${params.toString()}`, { replaceState: true });
			});
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
		{pickRandom}
		{refreshLocation}
		{useCustomAddress}
		distance={data.distance}
		onToggleFavourites={(val) => (showFavouritesOnly = val)}
		onToggleOpen={(val) => (showOnlyOpen = val)}
	/>

	{#if picked}
		<PickedCard restaurant={picked} />
	{/if}

	<div class="grid gap-2">
		{#each restaurants as restaurant (restaurant.id)}
			<RestaurantListItem {restaurant} {toggleFavorite} />
		{/each}
	</div>
</div>
