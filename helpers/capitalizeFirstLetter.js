exports.capitalizeFirstLetter = str => {
	const splitter = str.includes('-') ? '-' : ' ';
	return str
		.split(splitter)
		.map(word => {
			return word[0].toUpperCase() + word.slice(1);
		})
		.join(splitter);
};
