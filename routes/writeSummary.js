var express = require("express");
var router = express.Router();
const dotenv = require("dotenv");
const fs = require("fs");

router.post("/", async (req, res, next) => {
	writeSummary(req.body.summary);
	res.json({ success: true });
});

router.get("/", async (req, res, next) => {
	const fileExists = await fileExists(req.body.path);

	res.json(summary);
});

const writeSummary = async (summary) => {
	// Write summary json object to file
	fs.writeFile(
		"./public/data/json/summary.json",
		JSON.stringify(summary, null, 4),
		(error) => {
			if (error) {
				console.error("Error writing file:", error); // Handle the error
				return;
			}

			console.log("File written successfully");
		}
	);
};

const fileExists = async (path) => {
	if (fs.existsSync(path)) {
		return true;
	} else {
		return false;
	}
};

module.exports = router;
