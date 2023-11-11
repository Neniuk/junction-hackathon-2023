var express = require("express");
var router = express.Router();

materialData = {
	materials: [],
};

router.post("/", (req, res) => {
	// The endpoint takes in a JSON object with time and price data from a python program,
	// and sends it to a javascript function that will render it as a graph on the webpage
	// The JSON object looks like this:
	// {
	// 		"material": "wood",
	//     "timeData": ["2019-01-01", "2019-01-02", "2019-01-03"],
	//     "priceData": [1.0, 2.0, 3.0]
	// }

	// Take information
	newMaterial = {
		material: req.body.material,
		timeData: req.body.timeData,
		priceData: req.body.priceData,
	};
	materialData.materials.push(newMaterial);
});

router.get("/", (req, res) => {
	res.json(materialData);
});

module.exports = router;
