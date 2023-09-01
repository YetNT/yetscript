let vars = ["constant", "variable", "blockScoped", "variables"];

/**
 * Load module based on name
 * @param {string} inputStr Module name
 * @param {string} trimmedLine trimmedLine from index.
 * @returns
 */
module.exports = (inputStr, trimmedLine) => {
    let func;

    if (vars.includes(inputStr)) {
        // If inputStr is in the vars array, point to the ./funcs/var file
        func = require("./funcs/var");
    } else {
        // Otherwise, load a module based on inputStr
        func = require(`./funcs/${inputStr}`);
    }

    if (typeof func !== "function") {
        throw new TypeError(`Keyword ${inputStr} does not exist.`);
    }

    return func(trimmedLine);
};
