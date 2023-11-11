import { getElectricityPrices } from "./electricityPriceAPI.js";
// import { ollama } from "../../models/ollama.js";
// import { getMaterialData } from "./materialData.js";

// import { ollama } from "../../models/ollama.js";
// import { response } from "express";

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
	// const materialData = await getMaterialData();
		var aiResponseBox = document.getElementById("ai-response");

	

	button.addEventListener("click", async function () {
        var textareaContent = document.getElementById("input-area").value;
        console.log("Textarea content: ", textareaContent);
        
        const aiResponse = await processInput(textareaContent);
        aiResponseBox.value = aiResponse;
    });

	async function processInput(inputText) {
        return inputText;
    }


	// endTime, startTime, value, variableID
	const data = await getElectricityPrices(
		"2021-01-01T00:00:00Z",
		"2021-02-01T00:00:00Z",
		0
	);



}

