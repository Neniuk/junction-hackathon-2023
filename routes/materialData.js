var express = require("express");
var router = express.Router();

const materialData = {
	materials: [],
};

router.post("/post", (req, res) => {
	console.log("Test");
	console.log(req.body);
	newMaterial = {
		material: req.body.material,
		timeData: req.body.timeData,
		priceData: req.body.priceData,
	};
	materialData.materials.push(newMaterial);
	res.json(materialData);
});

router.get("/", (req, res) => {
	res.json(materialData);
});

module.exports = router;
