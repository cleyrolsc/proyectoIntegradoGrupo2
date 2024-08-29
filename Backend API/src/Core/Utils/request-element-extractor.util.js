const { BadRequestError } = require("../Abstractions/Exceptions");
const { isNotNullNorUndefined, isNotNullUndefinedNorEmpty, isNullUndefinedOrEmpty } = require("./null-checker.util");
const { AuthService, UsersService } = require("../../Services");

const extractPaginationElements = (request, defaultPageSize = 10) => {
    let page = isNotNullNorUndefined(request.query.page) ? +request.query.page : 1;
    let pageSize = isNotNullNorUndefined(request.query.pageSize) ? +request.query.pageSize : defaultPageSize;
  
    return { page, pageSize };
};

const extractDateRange = (request) => {
  let startDate = isNotNullUndefinedNorEmpty(request.query.startDate) ? new Date(request.query.startDate).getTime() : new Date(Date.now() - 86400000).getTime();
  let endDate = isNotNullUndefinedNorEmpty(request.query.endDate) ? new Date(request.query.endDate).getTime() : new Date().getTime();
  if (startDate > endDate) {
    throw new BadRequestError('Start date cannot be at a later date than end date');
  }

  return { startDate, endDate };
};

const fetchEmployeeIdWithAuthTokenAsync = async (request) => {
    const bearerHeader = request.header('authorization');
    if (isNullUndefinedOrEmpty(bearerHeader)) {
      throw new UnauthorizedError('No bearer authorization token was found');
    }
  
    let token = bearerHeader.split(' ')[1];
    if (isNullUndefinedOrEmpty(token)) {
      throw new UnauthorizedError('No token was found');
    }
  
    let { username } = await AuthService.validateTokenAsync(token);
    let { employeeInfo } = await UsersService.getUserProfileAsync(username);
  
    return employeeInfo.employeeId;
  }

module.exports = {
    extractPaginationElements,
    extractDateRange,
    fetchEmployeeIdWithAuthTokenAsync
};