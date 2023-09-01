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
    const code = `if (${condition}) ${block};`;

    return { type: "if", condition, block, code, trimmedLine };
};
