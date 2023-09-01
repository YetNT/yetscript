module.exports = (parts) => {
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
};
