import { writable } from 'svelte/store';

function createFavorites() {
	const initial: string[] =
		typeof window !== 'undefined' && localStorage.getItem('favorites')
			? JSON.parse(localStorage.getItem('favorites')!)
			: [];

	const store = writable<string[]>(initial);

	if (typeof window !== 'undefined') {
		store.subscribe((value) => {
			localStorage.setItem('favorites', JSON.stringify(value));
		});
	}

	return store;
}

export const favorites = createFavorites();
