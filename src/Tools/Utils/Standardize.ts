export const toStandardName = (service_name: string) => {
	return service_name.toLowerCase().replace(' ', '_');
};
