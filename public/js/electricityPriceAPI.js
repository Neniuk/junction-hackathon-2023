const getElectricityPrices = async (startTime, endTime, variableID) => {
	const req =
		"https://api.fingrid.fi/v1/variable/" +
		variableID +
		"/events/json?start_time=" +
		startTime +
		"&end_time=" +
		endTime;

	console.log("req: ", req);
	const res = await fetch(req);
	const data = await res.json();

	return data;
};

export { getElectricityPrices };
