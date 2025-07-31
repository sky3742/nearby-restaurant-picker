export function getBrowserLocation(): Promise<{ lat: number; lon: number }> {
	return new Promise((resolve, reject) => {
		if (!navigator.geolocation) {
			reject(new Error('Geolocation is not supported'));
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(pos) => {
				resolve({
					lat: +pos.coords.latitude.toFixed(4),
					lon: +pos.coords.longitude.toFixed(4)
				});
			},
			(err) => reject(err)
		);
	});
}
