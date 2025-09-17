export default class PaginatedEntity<T> {
    constructor(
        public items: T[],
        public totalItems: number,
        public currentPage: number,
        public itemsPerPage: number,
        public totalPages: number
    ) {}
}