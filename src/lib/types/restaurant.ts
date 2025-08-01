export type Restaurant = {
	id: string;
	name: string;
	lat: number;
	lon: number;
	distance: number;
	openingHours?: string;
	isOpen?: boolean;
};
