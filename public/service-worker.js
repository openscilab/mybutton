self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('fetch', event => {
	const req = event.request;
	event.respondWith(
		//? look in the cache for the resource
		caches.match(req).then(async res => {
			if (!!res) return res;
			const { pathname, protocol } = new URL(req.url);

			//? Type of request
			let isFaIcon = /fa\.bundle/.test(pathname);
			let isFont = /\.(woff2?|ttf|otf|eot)$/i.test(pathname);
			let isImage = /\.(png|jpe?g|gif|svg|webp)$/i.test(pathname);

			//? if not found fetch it from the network
			let networkRes;
			try {
				networkRes = await fetch(req);
				//? if the resource is an http(s) resource cache it
				if (/^https?:$/i?.test(protocol)) {
					let cache;
					const clonedRes = networkRes.clone();

					//* FaIcons
					if (isFaIcon) cache = await caches.open('FaIconBundle');
					//* Images
					else if (isImage) cache = await caches.open('Images');
					//* Fonts
					else if (isFont) cache = await caches.open('Fonts');

					if (!!cache && clonedRes.ok) cache.put(req, clonedRes);
				}
			} catch (error) {
				//? Error handling
				console.log('Cache Error:', error);
				if (isFont) caches.delete('Fonts');
				if (isImage) caches.delete('Images');
				if (isFaIcon) caches.delete('FaIconBundle');

				return fetch(req);

				//
			} finally {
				//? respond with the cloned network response
				return networkRes;
			}
		})
	);
});
