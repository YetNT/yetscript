const lexicon = require("../../lexicon.json");

module.exports = (trimmedLine) => {
    const block = trimmedLine.includes("=)")
        ? trimmedLine
        : `${trimmedLine} =)`;
    const code = trimmedLine.replace("(=", "/*").replace("=)", "*/");
    return { type: "comment", block, code, trimmedLine };
};
