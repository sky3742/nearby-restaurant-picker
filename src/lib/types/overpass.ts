export type OverpassResponse = {
	elements: Array<{
		type: string;
		id: string;
		tags?: Record<string, string>;
		lat?: number;
		lon?: number;
		center?: { lat: number; lon: number };
	}>;
};
