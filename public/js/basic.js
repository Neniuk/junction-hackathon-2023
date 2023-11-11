import { getElectricityPrices } from "./electricityPriceAPI.js";
import { getMaterialData } from "./materialData.js";
import { postOllama } from "./ollamaAPI.js";
// import Chart from 'chart.js/auto'

import { getYleArticles, summarizeArticles } from "./articles.js";

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

	// Testing >
	// const articles = await getYleArticles();
	// console.log("articles: ", articles);
	const summarized = await summarizeArticles();
	console.log("summarized: ", summarized);
	const materials = await getMaterialData();
	console.log("materials: ", materials);
	// < Testing

	async function processInput(inputText) {
		return inputText;
	}

	// const summarized = await summarizeArticles();

	// endTime, startTime, value, variableID
	// const data = await postOllama(
	// 	"llama2",
	// 	"You are Mario",
	// 	"What is your job?",
	// 	false
	// );
	// console.log("data: ", data);

	// console.log("materialData: ", materialData.materials.timeData);
	// console.log("timeData: ", await materialData.materials.timeData);

	console.log("materialData: ", materialData.materials);
	new Chart(document.getElementById("myChart"), {
		type: "line",
		data: {
			labels: materialData.materials[0].timeData.map((year) =>
				parseInt(year)
			),
			datasets: materialData.materials.map((material, index) => ({
				label: index === 0 ? material.material : "",
				data: material.priceData,
				fill: false,
				borderColor: "rgba(255, 99, 132, 1)",
				borderWidth: 2,
				pointBackgroundColor: "rgba(255, 99, 132, 1)",
				pointRadius: 5,
				pointHoverRadius: 8,
			})),
		},
		options: {
			scales: {
				x: {
					type: "linear",
					position: "bottom",
					title: {
						display: true,
						text: "Time",
						font: {
							size: 22,
						},
					},
					ticks: {
						callback: function (value) {
							return Number.isInteger(value) ? value : "";
						},
					},
				},
				y: {
					type: "linear",
					title: {
						display: true,
						text: "Price",
						font: {
							size: 22,
						},
					},
				},
			},
			plugins: {
				title: {
					display: true,
					text: "Material Price Data",
					font: {
						size: 18,
						weight: "bold",
					},
				},
			},
			responsive: true,
			maintainAspectRatio: false,
		},
	});
}
