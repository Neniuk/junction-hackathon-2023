import { postOllama } from "./ollamaAPI.js";

const getYleArticles = async () => {
	const req = "http://localhost:3000/yle";

	console.log("req: ", req);
	const res = await fetch(req);
	const data = await res.json();

	return data;
};

const summarizeArticles = async () => {
	const articles = await getYleArticles();
	console.log("articles: ", articles);

	const summarized = await postOllama(
		"llama2",
		"According to the context provided later, give a short prediction of the energy market and its prices according to the articles in the context. The response should only be a short one paragraph, but still be informative and accurate. ## NOTE ## Do not make up data, if you do not know then say so. ## END NOTE ##  ## CONTEXT ## " +
			articles.articles +
			" ## END CONTEXT ##",
		true
	);
	return await summarized;
};

export { getYleArticles, summarizeArticles };
