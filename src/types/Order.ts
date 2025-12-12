export interface Order {
    id?: string,
    title: string,
    city: string,
    deadline: string,
    weight: string,
    payment: string,
    features: string[],
    desc: string,
    avance: boolean,
}