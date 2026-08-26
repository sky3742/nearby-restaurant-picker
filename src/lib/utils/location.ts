import { goto } from '$app/navigation';
import { isLoading } from '$lib/stores';

export function refreshLocation() {
	isLoading.set(true);

	if (!navigator.geolocation) {
		alert('Geolocation is not supported');
		isLoading.set(false);
		return;
	}

	navigator.geolocation.getCurrentPosition(
		(pos) => {
			const params = new URLSearchParams(window.location.search);
			params.set('lat', +pos.coords.latitude.toFixed(4) + '');
			params.set('lon', +pos.coords.longitude.toFixed(4) + '');
			goto(`?${params.toString()}`, { replaceState: true }).finally(() => isLoading.set(false));
		},
		(err) => {
			console.error('Location error:', err);
			alert('Check your browser permissions.');
			isLoading.set(false);
		}
	);
}
