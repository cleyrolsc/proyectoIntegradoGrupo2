class PaginatedResponse {
    constructor() {
        this.currentPage = 0;
        this.itemsPerPage = 0;
        this.totalPages = 0;
        this.hasNext = false;
        this.items = [];
    }
};

module.exports = PaginatedResponse;