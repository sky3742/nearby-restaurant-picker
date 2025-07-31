import { getRestaurants } from '../lib/overpass';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const lat = parseFloat(url.searchParams.get('lat') || '0');
	const lon = parseFloat(url.searchParams.get('lon') || '0');

	if (!lat || !lon) return { missingLocation: true };

	const restaurants = await getRestaurants(lat, lon);
	return { restaurants };
};
