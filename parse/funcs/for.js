const generateVariable = require("../utils/generateVariable");
const conditionChange = require("../utils/conditionChange");
const lexicon = require("../../lexicon.json");

module.exports = (trimmedLine) => {
    let conditionInBraces = trimmedLine.slice(
        trimmedLine.indexOf(lexicon.leftBrace) + 1,
        trimmedLine.indexOf(lexicon.rightBrace)
    );
    const conditionArray = conditionInBraces.split(lexicon.eol);
    const variable = generateVariable(conditionArray[0].split(" "));
    const conditionalStatement = conditionChange(conditionArray[1]);
    const condition = `${variable}${conditionalStatement};${conditionArray[2]}`;
    const block = trimmedLine.slice(trimmedLine.indexOf(lexicon.newBlock) + 2);
    const code = `for (${condition}) ${block};`;

    return { type: "for", condition, block, code, trimmedLine };
};
