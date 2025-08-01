import type { Restaurant } from '$lib/types';
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
    )
	  ["shop"!~"convenience"];
    out center;
  `;

	const response = await fetch('https://overpass-api.de/api/interpreter', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: `data=${encodeURIComponent(query)}`
	});

	const data = await response.json();

	return data.elements
		.filter((el: any) => el.tags?.name)
		.map((el: any) => ({
			...el,
			lat: el.lat || el.center?.lat,
			lon: el.lon || el.center?.lon
		}))
		.map((el: any) => ({
			...el,
			name: el.tags.name || 'Unnamed restaurant',
			openingHours: el.tags?.opening_hours || 'Unknown',
			isOpen: el.tags?.opening_hours ? isOpenNow(el.tags.opening_hours) : undefined,
			distance: haversineDistance(lat, lon, el.lat, el.lon)
		})) as Restaurant[];
}
