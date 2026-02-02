interface ProductDTO {
    id: number;
    title: string;
    description: string;
    imagesUrl: string[];
}

interface Inventory {
    id: number;
    product: ProductDTO;
    quantity: number;
    sellerId: number;
    price: number;
}

interface CartProductItem {
    id: number;
    inventory: Inventory;
    quantity: number;
    totalPrice: number;
}