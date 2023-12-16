const isNotNullOrUndefined = (param) => {
    return param !== undefined && param !== null;
};

const isNotNullUndefinedOrEmpty = (param) => {
    return param !== undefined && param !== null && param !== "";
};

module.exports = {
    isNotNullOrUndefined,
    isNotNullUndefinedOrEmpty
};