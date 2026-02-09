export interface List {
    id: string,
    type: string,
    show: boolean
}

export interface Filter {
    query: string,
    count: number,
}