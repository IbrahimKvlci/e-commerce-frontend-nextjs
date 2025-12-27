interface Product {
    id: number;
    title: string;
    description: string;
}

interface ProductInventory {
    id: number;
    product: Product;
    quantity: number;
    sellerId: number;
    price: number;
}

export interface OrderItem {
    id: number;
    productInventory: ProductInventory;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}