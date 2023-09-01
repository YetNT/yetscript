const fs = require("fs");

const filePath = "script.yet";
const fileContent = fs.readFileSync(filePath, "utf-8");

const lines = fileContent.split(/[\n\r](?![^{]*})/); // split between lines but not curly brace pairs
const parse = require("./parse/moduleParse");

function generateVariable(parts) {
    const type =
        parts[0] == "constant"
            ? "const"
            : parts[0] == "blockScoped"
            ? "let"
            : "variable"
            ? "let"
            : parts[0];
    const variableName = parts[1].split(":")[0];
    const value = parts.slice(2).join(" ");
    return `${type} ${variableName} = ${value};`;
}

const codeObjects = [];

// Loop through each line of code
for (const line of lines) {
    const trimmedLine = line
        .trim()
        .replace(/\{\s+/g, "{")
        .replace(/\s+\}/g, "}");

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
    }
}

// Generate the final code by combining code objects
const generatedCode = codeObjects.map((obj) => obj.code).join("\n");

codeObjects.push({ generatedCode });

console.log(codeObjects);

console.log("\n\n OUTPUT \n\n");
eval(generatedCode);
