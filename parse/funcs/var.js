const generateVariable = require("../utils/generateVariable");

module.exports = (trimmedLine) => {
    const parts = trimmedLine.split(" ");
    const type = "variable";
    const code = generateVariable(parts);

    return { type, code };
};
