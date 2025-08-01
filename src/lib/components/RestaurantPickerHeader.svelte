<script lang="ts">
	import { goto } from '$app/navigation';
	import { Dice5, MapPin, RefreshCcw } from 'lucide-svelte';
	import { DistanceSelector } from '.';

	let addressInput: string;

	export let distance: number;
	export let showFavouritesOnly: boolean;
	export let showOnlyOpen: boolean;

	export let onToggleFavourites: (val: boolean) => void;
	export let onToggleOpen: (val: boolean) => void;
	export let pickRandom: () => void;
	export let refreshLocation: () => void;
	export let useCustomAddress: (val: string) => void;
</script>

<div class="mb-4 space-y-4">
	<h1 class="text-2xl font-bold dark:text-white">🍜 Nearby Restaurant Picker</h1>

	<DistanceSelector
		distance={distance / 1000}
		onChange={(val) => {
			const params = new URLSearchParams(window.location.search);
			params.set('distance', val.toString());
			goto(`?${params.toString()}`);
		}}
	/>

	<div class="flex gap-2">
		<input
			placeholder="e.g. Mid Valley KL"
			bind:value={addressInput}
			class="flex-1 rounded border p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
		/>
		<button
			on:click={() => useCustomAddress(addressInput)}
			class="flex items-center gap-1 rounded bg-purple-600 px-4 py-2 text-white"
		>
			<MapPin size={16} /> Go
		</button>
	</div>

	<div class="grid gap-2 md:grid-cols-2">
		<button
			on:click={pickRandom}
			class="flex items-center justify-center gap-2 rounded bg-green-600 px-4 py-2 text-white"
		>
			<Dice5 size={18} /> Pick Random
		</button>
		<button
			on:click={refreshLocation}
			class="flex items-center justify-center gap-2 rounded bg-blue-600 px-4 py-2 text-white"
		>
			<RefreshCcw size={18} /> Refresh Location
		</button>
	</div>

	<div class="flex gap-4">
		<label class="flex items-center gap-2 dark:text-gray-200">
			<input
				type="checkbox"
				bind:checked={showFavouritesOnly}
				on:change={(e) => onToggleFavourites(e.currentTarget.checked)}
			/>
			Favourites only
		</label>
		<label class="flex items-center gap-2 dark:text-gray-200">
			<input
				type="checkbox"
				bind:checked={showOnlyOpen}
				on:change={(e) => onToggleOpen(e.currentTarget.checked)}
			/>
			Show only open
		</label>
	</div>
</div>
