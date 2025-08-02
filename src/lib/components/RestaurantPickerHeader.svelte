<script lang="ts">
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
	export let distanceChange: (val: number) => void;
</script>

<div class="mb-4 space-y-4">
	<h1 class="text-2xl font-bold">🍜 Nearby Restaurant Picker</h1>

	<DistanceSelector distance={distance / 1000} onChange={distanceChange} />

	<div class="flex gap-2">
		<input placeholder="e.g. Mid Valley KL" bind:value={addressInput} class="input grow" />
		<button on:click={() => useCustomAddress(addressInput)} class="btn btn-primary">
			<MapPin size={16} /> Go
		</button>
	</div>

	<div class="grid gap-2 md:grid-cols-2">
		<button on:click={pickRandom} class="btn btn-outline btn-accent">
			<Dice5 size={18} /> Pick Random
		</button>
		<button on:click={refreshLocation} class="btn btn-outline btn-secondary">
			<RefreshCcw size={18} /> Refresh Location
		</button>
	</div>

	<div class="flex gap-4">
		<label class="flex items-center gap-2">
			<input
				type="checkbox"
				class="checkbox checked:checkbox-success"
				name="showFavouritesOnly"
				bind:checked={showFavouritesOnly}
				on:change={(e) => onToggleFavourites(e.currentTarget.checked)}
			/>
			Favourites only
		</label>
		<label class="flex items-center gap-2">
			<input
				type="checkbox"
				class="checkbox checked:checkbox-success"
				name="showOnlyOpen"
				bind:checked={showOnlyOpen}
				on:change={(e) => onToggleOpen(e.currentTarget.checked)}
			/>
			Show only open
		</label>
	</div>
</div>
