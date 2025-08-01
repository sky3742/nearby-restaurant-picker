import opening_hours from 'opening_hours';

export function isOpenNow(openingHoursStr: string): boolean {
	try {
		const oh = new opening_hours(openingHoursStr);
		return oh.getState(); // true = open
	} catch {
		console.warn('Invalid opening_hours:', openingHoursStr);
		return true; // fallback: assume open
	}
}
