<script lang="ts">
	import type { Restaurant } from '$lib/types';
	import { getMapLink } from '$lib/utils';
	export let restaurant: Restaurant;
</script>

<div
	class="mb-4 flex flex-col items-center justify-between rounded bg-yellow-100 p-4 md:flex-row dark:bg-yellow-900"
>
	<h2 class="text-xl font-semibold">
		<a href={getMapLink(restaurant.lat, restaurant.lon)} target="_blank" rel="noopener noreferrer">
			🎉 You should try: {restaurant.name}
		</a>
	</h2>
	<span class="text-sm text-nowrap text-gray-500">
		{restaurant.distance.toFixed(2)} km away
	</span>
</div>
