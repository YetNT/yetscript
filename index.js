const fs = require("fs");

const filePath = "script.yet";
const fileContent = fs.readFileSync(filePath, "utf-8");
const lexicon = require("./lexicon.json");

const lines = fileContent.split(/[\n\r](?![^\(=]*=\))(?![^{]*})/g); // split between lines but not curly brace pairs
console.log(lines);
const parse = require("./parse/moduleParse");
const { removeAllListeners } = require("process");

const codeObjects = [];

// Loop through each line of code
for (const line of lines) {
    const trimmedLine = line
        .trim()
        .replace(/\{\s+/g, "{")
        .replace(/\s+\}/g, "}")
        .replace(/\(=\s+/g, "{")
        .replace(/\s+\=\)/g, "}");

    // Skip empty lines
    if (trimmedLine === "") continue;

    if (
        trimmedLine.startsWith("constant") ||
        trimmedLine.startsWith("blockScoped") ||
        trimmedLine.startsWith("variable")
    ) {
        const type = "variable";
        codeObjects.push(parse(type, trimmedLine));
    } else if (trimmedLine.startsWith("for")) {
        codeObjects.push(parse("for", trimmedLine));
    } else if (trimmedLine.startsWith("if")) {
        codeObjects.push(parse("if", trimmedLine));
    } else if (trimmedLine.startsWith("while")) {
        codeObjects.push(parse("while", trimmedLine));
    } else if (trimmedLine.startsWith("(=")) {
        codeObjects.push(parse("comment", trimmedLine));
    }
}

// Generate the final code by combining code objects
const generatedCode = codeObjects.map((obj) => obj.code).join("\n");

codeObjects.push({ generatedCode });

console.log(codeObjects);

console.log("\n\n OUTPUT \n\n");
eval(generatedCode);
