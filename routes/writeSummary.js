var express = require("express");
var router = express.Router();
const dotenv = require("dotenv");
const fs = require("fs");

router.post("/post", async (req, res, next) => {
	const success = await writeSummary(req.body.summary);
	res.json({ success: success });
});

router.get("/", async (req, res, next) => {
	const exists = await fileExists(req.body.path);
	res.json({ exists: exists });
});

const writeSummary = async (summary) => {
	// Write summary json object to file
	fs.writeFile(
		"./public/data/json/summary.json",
		JSON.stringify(summary, null, 4),
		(error) => {
			if (error) {
				console.error("Error writing file:", error); // Handle the error
				return false;
			}

			console.log("File written successfully");
			return true;
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
