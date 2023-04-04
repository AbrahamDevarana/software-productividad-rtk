export interface Paginate {
    totalItems: number;
    totalPages: number;
    currentPage: number;
}


export interface InitialState {
    isLoading:    boolean;
    error:        boolean;
    infoMessage:  string;
    updated:      boolean;
    created:      boolean;
    deleted:      boolean;
}

