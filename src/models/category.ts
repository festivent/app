export interface Category {
    id: number,
    name: string,
    icon: string,
    children?: Category[]
}