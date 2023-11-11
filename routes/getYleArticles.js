var express = require("express");
var router = express.Router();
var puppeteer = require("puppeteer");
const dotenv = require("dotenv");
const fs = require("fs");

const englishEnergyArticles = "https://yle.fi/news/18-40146";
const finnishEnergyArticles = "https://yle.fi/uutiset/18-796";
// const customSearch = "https://haku.yle.fi/?query=" + query + "&type=article"
const numOfArticles = 5;

async function startBrowser() {
	let browser;
	try {
		console.log("Opening the browser......");
		browser = await puppeteer.launch({
			headless: true,
			args: ["--disable-setuid-sandbox"],
			ignoreHTTPSErrors: true,
		});
	} catch (err) {
		console.log("Could not create a browser instance => : ", err);
	}
	return browser;
}

const getArticles = async (browser, articleSearchLink1, articleSearchLink2) => {
	// Start a Puppeteer session with:
	// const browser = await startBrowser();

	// Open a new page
	let page = await browser.newPage();

	// Navigate to the selected page
	console.log(`Navigating to ${articleSearchLink1}...`);
	await page.goto(articleSearchLink1, {
		waitUntil: "domcontentloaded",
	});

	const articles = await page.$("#yle__contentAnchor");
	const links = await articles.$$(".underlay-link");

	const propertyJsHandles = await Promise.all(
		links.map((handle) => handle.getProperty("href"))
	);
	const hrefs = await Promise.all(
		propertyJsHandles.map((handle) => handle.jsonValue())
	);

	let page2 = await browser.newPage();
	console.log(`Navigating to ${articleSearchLink1}...`);
	await page2.goto(articleSearchLink2, {
		waitUntil: "domcontentloaded",
	});

	const articles2 = await page2.$("#yle__contentAnchor");
	const links2 = await articles2.$$(".underlay-link");

	const propertyJsHandles2 = await Promise.all(
		links2.map((handle) => handle.getProperty("href"))
	);
	const hrefs2 = await Promise.all(
		propertyJsHandles2.map((handle) => handle.jsonValue())
	);
	// console.log(hrefs);

	// Only take maximum 5 articles from each href array
	// Handle the case where there are less than numOfArticles articles
	hrefs.splice(numOfArticles);
	hrefs2.splice(numOfArticles);

	const articleLinks = hrefs.concat(hrefs2);

	return articleLinks;

	// await browser.close();
};

const getArticleContent = async (browser, articleLink) => {
	// Start a Puppeteer session with:
	// const browser = await startBrowser();

	// Open a new page
	let page = await browser.newPage();

	// Navigate to the selected page
	console.log(`Navigating to ${articleLink}...`);
	await page.goto(articleLink, {
		waitUntil: "domcontentloaded",
	});

	const articleContent = await page.$(".yle__article__content");
	const paragraphs = await articleContent.$$("p");

	const propertyJsHandles = await Promise.all(
		paragraphs.map((handle) => handle.getProperty("textContent"))
	);
	const texts = await Promise.all(
		propertyJsHandles.map((handle) => handle.jsonValue())
	);

	return texts;

	// await browser.close();
};

router.get("/", async function (req, res, next) {
	message = {
		exists: false,
		articles: [],
		references: [],
	};

	if (fs.existsSync("./public/data/json/yleArticles.json")) {
		console.log("File exists");
		message.exists = true;
		fs.readFile("./public/data/json/yleArticles.json", (error, content) => {
			if (error) {
				console.error("Error reading file:", error); // Handle the error
				res.json(message);
				return;
			}
			const fileData = JSON.parse(content);
			console.log(fileData);
			message.articles = fileData.articles;
			message.references = fileData.references;
			res.json(message);
		});
	} else {
		const browser = await startBrowser();

		const articles = await getArticles(
			browser,
			englishEnergyArticles,
			finnishEnergyArticles
		);
		console.log(articles);

		for (let i = 0; i < articles.length; i++) {
			const articleContent = await getArticleContent(
				browser,
				articles[i]
			);
			message.articles.push(articleContent);
			message.references.push(articles[i]);
		}

		// Join all articles into one single block of text
		let allArticles = "";
		for (let i = 0; i < message.articles.length; i++) {
			message.articles[i] = message.articles[i].join(" \n ");
		}
		allArticles = message.articles.join(" \n\n<new-article>\n\n ");
		message.articles = allArticles;
		res.json(message);

		await browser.close();

		// Write articles to file
		fs.writeFile(
			"./public/data/json/yleArticles.json",
			JSON.stringify(message),
			function (err) {
				if (err) return console.log(err);
				console.log("Articles written to file");
			}
		);
	}
});

module.exports = router;
