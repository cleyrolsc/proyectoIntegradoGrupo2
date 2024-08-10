const isListEmpty = (list) => {
    return list === undefined || list === null || list.length === 0;
}

const isNotNullNorUndefined = (param) => {
    return param !== undefined && param !== null;
};

const isNotNullUndefinedNorEmpty = (param) => {
    return param !== undefined && param !== null && param !== "";
};

const isNullOrUndefined = (param) => {
    return param === undefined || param === null;
}

const isNullUndefinedOrEmpty = (param) => {
    return param === undefined || param === null || param === "";
}

const isArrayNullUndefinedOrEmpty = (param) => {
    return param === undefined || param === null || param.length === 0;
}

module.exports = {
    isListEmpty,
    isNotNullNorUndefined,
    isNotNullUndefinedNorEmpty,
    isNullOrUndefined,
    isNullUndefinedOrEmpty,
    isArrayNullUndefinedOrEmpty
};