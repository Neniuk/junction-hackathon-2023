const getYleArticles = async () => {
	const req = "http://localhost:3000/yle";

	console.log("req: ", req);
	const res = await fetch(req);
	const data = await res.json();

	return data;
};

export { getYleArticles };
