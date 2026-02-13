export interface Category {
    id: number,
    name: string,
    parentCategory: Category | null
    subCategory: Category | null
}