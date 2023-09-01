const generateVariable = require("../utils/generateVariable");

module.exports = (trimmedLine) => {
    let condition = trimmedLine.slice(
        trimmedLine.indexOf("[") + 1,
        trimmedLine.indexOf("]")
    );
    const variable = generateVariable(
        condition
            .slice(condition.indexOf(""), condition.indexOf(";"))
            .split(" ")
    );
    condition = `${variable}${condition.slice(
        condition.indexOf(";") + 1,
        condition.length
    )}`;
    const code = trimmedLine.slice(trimmedLine.indexOf("#>") + 2);

    return { type: "for", condition, code };
};
