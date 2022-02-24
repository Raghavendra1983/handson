export interface RatingType {
    rate: number,
    count: number
}
export interface productType {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: URL,
    rating: RatingType
}