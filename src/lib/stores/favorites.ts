import { writable } from 'svelte/store';

const initial: string[] =
	typeof window !== 'undefined' && localStorage.getItem('favorites')
		? JSON.parse(localStorage.getItem('favorites')!)
		: [];

export const favorites = writable<string[]>(initial);

if (typeof window !== 'undefined') {
	favorites.subscribe((value) => {
		localStorage.setItem('favorites', JSON.stringify(value));
	});
}
