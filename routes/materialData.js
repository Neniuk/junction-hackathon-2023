var express = require("express");
var router = express.Router();

materialData = {
	timeData: [],
	priceData: [],
};

router.post("/", (req, res) => {
	// The endpoint takes in a JSON object with time and price data from a python program,
	// and sends it to a javascript function that will render it as a graph on the webpage
	// The JSON object looks like this:
	// {
	//     "time": ["2019-01-01", "2019-01-02", "2019-01-03"],
	//     "price": [1.0, 2.0, 3.0]
	// }

	// Take information
	var time = req.body.timeData;
	var price = req.body.priceData;

	// Store information
	materialData.timeData = time;
	materialData.priceData = price;

	// Render the graph
	// res.render("materialPrices", { time: time, price: price });
});

router.get("/", (req, res) => {
	res.json(materialData);
});

module.exports = router;
