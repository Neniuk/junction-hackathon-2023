const getMaterialData = async () => {
	const req = "http://localhost:3000/materials";

	console.log("req: ", req);
	const res = await fetch(req);
	const data = await res.json();

	return data;
};

export { getMaterialData };
