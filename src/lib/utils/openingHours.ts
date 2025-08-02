import opening_hours from 'opening_hours';

export function isOpenNow(openingHoursStr: string): boolean {
	try {
		const openingHours = openingHoursStr.replace(/(\d{2}:\d{2})-24:00/g, '$1-23:59');
		const oh = new opening_hours(openingHours);
		return oh.getState(); // true = open
	} catch {
		console.warn('Invalid opening_hours:', openingHoursStr);
		return true; // fallback: assume open
	}
}
