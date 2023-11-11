const postOllama = async (model, prompt, stream) => {
	const req = "http://localhost:11434/api/generate";

	console.log("Starting ollama request...");
	const body = {
		model: model,
		prompt: prompt,
		// stream: false,
	};

	console.log("req: ", req);
	const res = await fetch(req, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
	const reader = res.body.getReader();
	const decoder = new TextDecoder();

	while (true) {
		const { done, value } = await reader.read();
		if (done) {
			console.log("done");
			return;
		}
		console.log("value: " + value);

		// Decode the chunk and append it to the DOM
		const chunkText = decoder.decode(value);
		console.log("chunkText: " + chunkText);
	}

	const data = await res.json();

	return data;
};

export { postOllama };
