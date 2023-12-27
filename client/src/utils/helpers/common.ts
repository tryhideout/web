export const formatAPIPath = (args: string[]): string => {
	const formattedURL = args.join('/');
	return formattedURL.startsWith('/') ? formattedURL : '/' + formattedURL;
};
