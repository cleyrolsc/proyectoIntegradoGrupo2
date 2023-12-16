class PaginatedResponse{
    content;

    constructor(){
        this.currentPage = 0;
        this.itemsPerPage = 0;
        this.totalPages = 0;
        this.hasNext = false;
    }
};

module.exports = PaginatedResponse;