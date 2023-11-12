const postSummary = async (summary) => {
	const req = "http://localhost:3000/summary";

	console.log("req: ", req);
	const res = await fetch(req, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(summary),
	});
	const data = await res.json();

	return data;
};

const getSummaryExists = async (path) => {
	const req = "http://localhost:3000/summary";

	console.log("req: ", req);
	const res = await fetch(req);
	const data = await res.json();

	return data;
};

export { postSummary, getSummaryExists };
