import { getElectricityPrices } from "./electricityPriceAPI.js";
import { getMaterialData } from "./materialData.js";
import { postOllama } from "./ollamaAPI.js";
// import Chart from 'chart.js/auto'

import { getYleArticles, summarizeArticles } from "./articles.js";
const summaryDiv = document.getElementById("summary");
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

	const summary = await summarizeArticles();
	summaryDiv.innerHTML = await summary;

	// Testing >
	// const articles = await getYleArticles();
	// console.log("articles: ", articles);

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
			labels: materialData.materials[0].timeData,
			datasets: materialData.materials
				.reverse()
				.map((material, index) => {
					let color;
					switch (index) {
						case 0:
							color = "red";
							break;
						case 1:
							color = "blue";
							break;
						case 2:
							color = "lime";
							break;
	
						default:
							color = getRandomColor(); 
							break;
					}

					return {
						label: material.material,
						data: material.priceData,
						fill: false,
						backgroundColor: color,
						borderColor: color,
						borderWidth: 2,
						pointBackgroundColor: color,
						pointRadius: 5,
						pointHoverRadius: 8,
					};
				}),
		},
		options: {
			scales: {
				x: {
					title: {
						display: true,
						text: "Time",
						font: {
							size: 25,
						},
					},
				},
				y: {
					title: {
						display: true,
						text: "Price",
						font: {
							size: 25,
						},
					},
					suggestedMin: 0,
					suggestedMax: 20000,
				},
			},
			plugins: {
				legend: {
					display: true,
					position: "top",
					labels: {
						font: {
							size: 14,
						},
					},
				},
				title: {
					display: true,
					text: "Price",
					font: {
						size: 28,
						weight: "bold",
					},
				},
			},
			responsive: true,
			maintainAspectRatio: false,
		},
	});
}
