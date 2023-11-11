import { getElectricityPrices } from "./electricityPriceAPI.js";
import { getMaterialData } from "./materialData.js";
import { postOllama } from "./ollamaAPI.js";
// import Chart from 'chart.js/auto'


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

	// endTime, startTime, value, variableID
	// const data = await postOllama(
	// 	"llama2",
	// 	"You are Mario",
	// 	"What is your job?",
	// 	false
	// );
	// console.log("data: ", data);
	console.log("materialData: ", await materialData.materials[2]);
	// console.log("timeData: ", await materialData.materials.timeData);

	
new Chart(
	document.getElementById('myChart'),
		{
		  type: 'line',
		  materialData: {
			labels: materialData.map(entry => entry.timeData), 
			datasets: [
			  {
				label: 'Material Price Data',
				materialData: materialData.map(entry => entry.priceData),
				fill: false,
				borderColor: 'rgba(75, 192, 192, 1)',
				borderWidth: 2,
				pointBackgroundColor: 'rgba(75, 192, 192, 1)',
				pointRadius: 5,
				pointHoverRadius: 8,
			  }
			]
		  },
		  options: {
			scales: {
			  x: {
				type: 'linear',
				position: 'bottom',
				title: {
				  display: true,
				  text: 'Time'
				}
			  },
			  y: {
				type: 'linear',
				title: {
				  display: true,
				  text: 'Price'
				}
			  }
			}
		  }
		}
	  );
	  
}
