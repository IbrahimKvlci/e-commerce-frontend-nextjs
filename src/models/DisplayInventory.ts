interface CategoryDTO {
    id: number;
    name: string;
    parentCategory: CategoryDTO | null;
}

interface BrandDTO {
    id: number;
    name: string;
}

interface ProductDTO {
    id: number;
    title: string;
    description: string;
    categoryDTO: CategoryDTO;
    brandDTO: BrandDTO;
    featured: boolean;
    imagesUrl: string[];
}

interface InventoryDTO {
    id: number;
    productDTO: ProductDTO;
    quantity: number;
    sellerId: number;
    price: number;
}

interface OtherInventory {
    id: number;
    productId: number;
    sellerId: number;
    price: number;
    quantity: number;
}

export interface DisplayInventory {
    inventoryDTO: InventoryDTO;
    otherInventories: OtherInventory[];
}

