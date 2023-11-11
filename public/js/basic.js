import { getElectricityPrices } from "./electricityPriceAPI.js";
import { getMaterialData } from "./materialData.js";
import { postOllama } from "./ollamaAPI.js";
// import { post } from "../../app.js";

if (document.readyState !== "loading") {
	console.log("Document ready");
	initializeCode();
} else {
	document.addEventListener("DOMContentLoaded", function () {
		console.log("DOMContentLoaded event fired");
		initializeCode();
	});
}

async function initializeCode() {
	var button = document.getElementById("input-button");
	// var buttonAI = document.getElementById("fetch-ai");

	// buttonAI.addEventListener("click", function () {
	// 	let llama = fetch();
	// });

	button.addEventListener("click", function () {
		var textareaContent = document.getElementById("input-area").value;
		console.log("Textarea content: ", textareaContent);
	});

	// endTime, startTime, value, variableID
	const data = await postOllama(
		"llama2",
		"You are Mario",
		"What is your job?",
		false
	);
	console.log("data: ", data);
}
