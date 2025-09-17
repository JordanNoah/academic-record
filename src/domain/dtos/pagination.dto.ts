import { Sorting } from "@/shared/interfaces";

export class PaginationDto {
    constructor(
        public itemsPerPage: number,
        public page: number,
        public sorting: Sorting | undefined | null,
        public search: string,
    ) {
        if (this.sorting && !['ASC', 'DESC'].includes(this.sorting.order)) {
            this.sorting.order = 'DESC';
        }
    }

    static create(object: { [key: string]: any }): [string?, PaginationDto?] {
        const {
            itemsPerPage,
            page,
            sortingKey,
            sortingOrder,
            search
        } = object

        return [
            undefined,
            new PaginationDto(
                itemsPerPage,
                page,
                {
                    key: sortingKey ?? 'createdAt',
                    order: sortingOrder ?? 'DESC',
                } as Sorting,
                search ?? '',
            )
        ]
    }
}

