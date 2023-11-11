var express = require("express");
var router = express.Router();
const fs = require("fs");

router.post("/post", (req, res) => {
	console.log("Test");
	console.log(req.body);
	const newMaterial = {
		material: req.body.material,
		timeData: req.body.timeData,
		priceData: req.body.priceData,
	};
	console.log(newMaterial);

	if (!fs.existsSync("./public/data/json/materials.json")) {
		console.log("File does not exist");
		const materialData = {
			materials: [],
		};
		materialData.materials.push(newMaterial);
		fs.writeFile(
			"./public/data/json/materials.json",
			JSON.stringify(materialData),
			function (err) {
				if (err) return console.log(err);
				console.log("Articles written to file");
				res.json(materialData);
			}
		);
	} else {
		console.log("File exists");
		// Get json object from file
		fs.readFile("./public/data/json/materials.json", (error, content) => {
			if (error) {
				console.error("Error reading file:", error); // Handle the error
				return;
			}
			const fileData = JSON.parse(content);
			console.log(fileData);
			fileData.materials.push(newMaterial);

			// Write materials to file
			fs.writeFile(
				"./public/data/json/materials.json",
				JSON.stringify(fileData),
				function (err) {
					if (err) return console.log(err);
					console.log("Articles written to file");
				}
			);
		});
	}
});

router.get("/", (req, res) => {
	res.json(materialData);
});

module.exports = router;
