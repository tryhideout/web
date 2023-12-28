export const formatAPIPath = (args: (string | number)[]): string => {
	let formattedURL = '';
	args.forEach((arg) => {
		const stringArg = arg.toString();
		formattedURL = formattedURL + (stringArg.startsWith('/') ? stringArg : '/' + stringArg);
	});
	return formattedURL.startsWith('/') ? formattedURL : '/' + formattedURL;
};
