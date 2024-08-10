const { isArrayNullUndefinedOrEmpty } = require("../../../Utils/null-checker.util");
const { FatalError } = require("../../Exceptions");

class PaginatedResponse {
    constructor() {
        this.currentPage = 0;
        this.itemsPerPage = 0;
        this.totalPages = 0;
        this.hasNext = false;
        this.items = [];
    }

    paginate(items, count) {
        if(this.currentPage < 1) {
            throw new FatalError("PaginatedResponse's current page has not been set");
        }

        if(this.itemsPerPage < 1) {
            throw new FatalError("PaginatedResponse's items per page has not been set");
        }

        this.totalPages = Math.ceil(count / this.itemsPerPage);
        this.hasNext = this.currentPage < this.totalPages;

        if (isArrayNullUndefinedOrEmpty(items)) {
            return;
        }

        this.items = [];
        items.forEach(entity => {
            this.items.push(entity);
        });
    }
};

module.exports = PaginatedResponse;