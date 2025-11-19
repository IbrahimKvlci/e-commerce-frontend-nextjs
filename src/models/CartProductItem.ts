interface ProductDTO {
    id: number;
    title: string;
    description: string;
}

interface Inventory {
    id: number;
    productDTO: ProductDTO;
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