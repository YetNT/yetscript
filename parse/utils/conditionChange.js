module.exports = (str) => {
    if (
        str == "isnt" ||
        str.includes("is bigger than") ||
        str.includes("is smaller than")
    )
        throw new TypeError(
            "Case mismatch. Use `is not`,`is greater than` and `is less than"
        );

    str = str
        .replace(/\bor\b/g, "||")
        .replace(/\band\b/g, "&&")
        .replace(/\bnot\b|\bisnt\b/g, "!")
        .replace(/\bis exactly\b|\bis precisely\b/g, "===")
        .replace(/\bis greater than\b|\bgreater than\b/g, ">")
        .replace(/\bis less than\b|\bless than\b/g, "<")
        .replace("! >", "<") // replace !> with < if dev doesnt use <
        .replace("! <", ">") // replace !< with > if dev doesnt use >
        .replace(/\bis equal to\b|\bis\b/g, "==")
        .replace("! ==", "!==")
        .replace("! ===", "!==")
        .replace("== !", "!==") // is not becomes == !, which isnt valid js
        .replace("=== !", "!=="); // just incase

    const parts = str.split(/([a-zA-Z]+)/);
    const processedParts = parts.map((part) => {
        // Check if the part contains alphabetic characters
        const containsAlphabet = /[a-zA-Z](?!(?:true|false)\b)/.test(part);
        const isTrueOrFalse = /^(true|false)$/.test(part);

        if (containsAlphabet && !isTrueOrFalse) {
            // Wrap the part with a variable declaration
            return `let ${part} = 1;`;
        } else {
            // Use the part as is
            return;
        }
    });

    // Join the processed parts back together to form the final condition
    const testCondition = `${processedParts.join("")}${str}`;
    console.log(testCondition);
    const condition = str;
    console.log(condition);

    try {
        eval(testCondition);
    } catch (err) {
        throw new TypeError("Invalid conditon");
    }
    return condition;
};
