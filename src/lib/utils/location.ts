import { goto } from '$app/navigation';
import { isLoading } from '$lib/stores';

export function getBrowserLocation(): Promise<{ lat: number; lon: number }> {
	return new Promise((resolve, reject) => {
		if (!navigator.geolocation) {
			reject(new Error('Geolocation is not supported'));
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(pos) => {
				resolve({
					lat: +pos.coords.latitude.toFixed(4),
					lon: +pos.coords.longitude.toFixed(4)
				});
			},
			(err) => reject(err)
		);
	});
}

export function refreshLocation() {
	isLoading.set(true);

	getBrowserLocation()
		.then(({ lat, lon }) => {
			const params = new URLSearchParams(window.location.search);
			params.set('lat', lat.toString());
			params.set('lon', lon.toString());
			return goto(`?${params.toString()}`, { replaceState: true });
		})
		.catch((err) => {
			console.error('Location error:', err);
			alert('Check your browser permissions.');
		})
		.finally(() => isLoading.set(false));
}
