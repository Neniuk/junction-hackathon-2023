import { getElectricityPrices } from "./electricityPriceAPI.js";
import { ollama } from "../../models/ollama.js";
import { getMaterialData } from "./materialData.js";

// const fs = require("fs");
import { ollama } from "../../models/ollama.js";

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
	const data = await getElectricityPrices(
		"2021-01-01T00:00:00Z",
		"2021-02-01T00:00:00Z",
		0
	);
}
