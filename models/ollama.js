import { Ollama } from "ollama-node";

const ollama = new Ollama();
await ollama.setModel("llama2");

// ollama.setSystemPrompt(systemPrompt);

// callback to print each word
const print = (word) => {
	process.stdout.write(word);
};
// await ollama.streamingGenerate("why is the sky blue", print);

export { ollama };
