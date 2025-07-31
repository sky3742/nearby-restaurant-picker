import type { Restaurant } from './types';

export async function getRestaurants(lat: number, lon: number): Promise<Restaurant[]> {
	const radius = 1000;
	const query = `
    [out:json];
    (
      node["amenity"="restaurant"](around:${radius},${lat},${lon});
      way["amenity"="restaurant"](around:${radius},${lat},${lon});
      relation["amenity"="restaurant"](around:${radius},${lat},${lon});
    );
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
			name: el.tags.name,
			lat: el.lat || el.center?.lat,
			lon: el.lon || el.center?.lon
		})) as Restaurant[];
}
