const { isNotNullNorUndefined, isNotNullUndefinedNorEmpty } = require("./null-checker.util");

const extractPaginationElements = (request, defaultPageSize = 10) => {
    let page = isNotNullNorUndefined(request.query.page) ? +request.query.page : 1;
    let pageSize = isNotNullNorUndefined(request.query.pageSize) ? +request.query.pageSize : defaultPageSize;
  
    return { page, pageSize };
};

const extractDateRange = (request) => {
  let startDate = isNotNullUndefinedNorEmpty(request.query.startDate) ? new Date(request.query.startDate) : new Date(Date.now() - 86400000);
  let endDate = isNotNullUndefinedNorEmpty(request.query.endDate) ? new Date(request.query.endDate) : new Date();
  
  return { startDate, endDate };
}

module.exports = {
    extractPaginationElements,
    extractDateRange
};