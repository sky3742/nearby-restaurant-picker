import type { OverpassResponse, Restaurant } from '$lib/types';
import { haversineDistance, isOpenNow } from '$lib/utils';

export async function getRestaurants(
	lat: number,
	lon: number,
	radius: number = 1000
): Promise<Restaurant[]> {
	const query = `
    [out:json];
    (
      node["amenity"~"restaurant|cafe|biergarten"](around:${radius},${lat},${lon});
      way["amenity"~"restaurant|cafe|biergarten"](around:${radius},${lat},${lon});
      relation["amenity"~"restaurant|cafe|biergarten"](around:${radius},${lat},${lon});
    );
    out center;
  `;

	const body = `data=${encodeURIComponent(query)}`;
	const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
	const opts = { method: 'POST', headers, body, signal: AbortSignal.timeout(15_000) };

	let res: Response;
	try {
		res = await fetch('https://overpass-api.de/api/interpreter', opts);
	} catch {
		res = await fetch('https://maps.mail.ru/osm/tools/overpass/api/interpreter', opts);
	}
	if (!res.ok) throw new Error('Overpass API unavailable');

	const data = (await res.json()) as OverpassResponse;

	return data.elements
		.filter((el) => el.tags?.name)
		.map((el) => ({
			...el,
			lat: el.lat || el.center!.lat,
			lon: el.lon || el.center!.lon
		}))
		.map((el) => ({
			...el,
			name: el.tags?.name || 'Unnamed restaurant',
			openingHours: el.tags?.opening_hours || 'Unknown',
			isOpen: el.tags?.opening_hours ? isOpenNow(el.tags.opening_hours) : undefined,
			distance: haversineDistance(lat, lon, el.lat, el.lon)
		})) as Restaurant[];
}
