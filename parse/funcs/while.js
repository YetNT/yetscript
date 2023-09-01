const conditionChange = require("../utils/conditionChange");
const lexicon = require("../../lexicon.json");

module.exports = (trimmedLine) => {
    const condition = conditionChange(
        trimmedLine.slice(
            trimmedLine.indexOf(lexicon.leftBrace) + 1,
            trimmedLine.indexOf(lexicon.rightBrace)
        )
    );
    const block = trimmedLine.slice(trimmedLine.indexOf(lexicon.newBlock) + 2);
    const code = `while (${condition}) ${block};`;

    return { type: "while", condition, block, code, trimmedLine };
};
