export function getMapLink(lat: number, lon: number) {
	const isMobile = /iPhone|Android/i.test(navigator.userAgent);
	return isMobile
		? `geo:${lat},${lon}`
		: `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
}
