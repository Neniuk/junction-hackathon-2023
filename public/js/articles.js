const getYleArticles = async () => {
	const req = "http://localhost:3000/yle";

	console.log("req: ", req);
	const res = await fetch(req);
	const data = await res.json();

	if (data.exists) {
		fs.readFile(
			"./public/data/text/yleArticles.json",
			function (error, content) {
				const fileData = JSON.parse(content);
				console.log(fileData);
				return fileData;
			}
		);
	}
	return data;
};

export { getYleArticles };
