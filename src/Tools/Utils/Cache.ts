export const removeFaIconCache = () => {
	if (!('caches' in window)) return;
	caches.has('FaIconBundle').then(has => has && caches.delete('FaIconBundle'));
};

export const removeImagesCache = () => {
	if (!('caches' in window)) return;
	caches.has('Images').then(has => has && caches.delete('Images'));
};

export const removeFontsCache = () => {
	if (!('caches' in window)) return;
	caches.has('Fonts').then(has => has && caches.delete('Fonts'));
};

export const removeBrowserCache = () => {
	removeFaIconCache();
	removeImagesCache();
	removeFontsCache();
};
