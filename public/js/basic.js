import { getElectricityPrices } from "./electricityPriceAPI.js";
import { getMaterialData } from "./materialData.js";
import { postOllama } from "./ollamaAPI.js";
import { getYleArticles } from "./articles.js";

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
	const materialData = await getMaterialData();
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

	const summarized = await summarizeArticles();

	// endTime, startTime, value, variableID
	const data = await postOllama(
		"llama2",
		"You are Mario",
		"What is your job?",
		false
	);
	console.log("data: ", data);
}

const summarizeArticles = async () => {
	const articles = await getYleArticles();
	console.log("articles: ", articles);

	const summarized = await postOllama(
		"llama2",
		articles.articles,
		"According to the context provided later, give a short prediction of the energy market and its prices according to the articles in the context. ## CONTEXT ## " +
			articles.articles +
			" ## END CONTEXT ##",
		true
	);
	return await summarized;
};
