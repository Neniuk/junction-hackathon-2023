const summary = document.getElementById("summary");
const summaryReferences = document.getElementById("summary-references");
import {
	postSummary,
	getSummaryExists,
	getSummary,
} from "./writeSummaryAPI.js";

const postOllama = async (model, prompt, stream) => {
	const req = "http://localhost:11434/api/generate";

	const writeable = {
		summary: "",
		references: [],
	};

	const summaryExists = await getSummaryExists(
		"./public/data/json/summary.json"
	);

	console.log("summaryExists: ", summaryExists);

	if (summaryExists.exists) {
		console.log("Exists!");
		const summaryElement = await getSummary();
		console.log("summary: ", summaryElement);
		summary.innerHTML = "";
		summaryReferences.innerHTML = "";

		summary.innerHTML = summaryElement.summary;

		return;
	}

	console.log("Starting ollama request...");
	const body = {
		model: model,
		prompt: prompt,
		// stream: false,
	};

	console.log("req: ", req);
	console.log("body: ", body);
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
			break;
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
		writeable.summary += resText;
	}
	console.log("writeable: ", writeable);
	const success = await postSummary(writeable);
	console.log("success: ", success);

	// const data = await res.json();

	// return data;
};

export { postOllama };
