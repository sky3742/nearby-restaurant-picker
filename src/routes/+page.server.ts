import { getRestaurants } from '$lib/apis';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const lat = parseFloat(url.searchParams.get('lat') || '0');
	const lon = parseFloat(url.searchParams.get('lon') || '0');
	const distance = parseInt(url.searchParams.get('distance') ?? '1000');

	if (!lat || !lon) return { restaurants: [] };

	const restaurants = await getRestaurants(lat, lon, distance);

	return { restaurants, distance };
};
