export interface Paginate {
    totalItem: number;
    totalPages: number;
    currentPage: number;
}


export interface InitialState {
    isLoading:    boolean;
    error:        boolean;
    infoMessage:  string;
}

