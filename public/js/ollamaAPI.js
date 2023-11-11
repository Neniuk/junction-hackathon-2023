const postOllama = async (model, context, prompt, stream) => {
	const req = "http://localhost:11434/api/generate";

	const body = {
		model: model,
		prompt: prompt,
		stream: false,
	};

	console.log("req: ", req);
	const res = await fetch(req, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
	const data = await res.json();

	return data;
};

export { postOllama };
