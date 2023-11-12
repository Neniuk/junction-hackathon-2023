const summary = document.getElementById("summary");
const summaryReferences = document.getElementById("summary-references");

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

	if (summary.innerHTML != "") {
		summary.innerHTML = "";
		summaryReferences.innerHTML = "";
	}

	while (true) {
		const { done, value } = await reader.read();
		if (done) {
			console.log("done");
			return;
		}
		// console.log("value: " + value);

		// Decode the chunk and append it to the DOM
		const chunkText = decoder.decode(value);
		const jsonChunk = JSON.parse(chunkText);
		const resText = jsonChunk.response;

		console.log("chunkText: " + chunkText);
		console.log("jsonChunk: " + jsonChunk);
		console.log("resText: " + resText);

		// Add to DOM (div with id "summary") the final should be one choseive text block
		summary.innerHTML += resText;
	}
	// const data = await res.json();

	// return data;
};

export { postOllama };
