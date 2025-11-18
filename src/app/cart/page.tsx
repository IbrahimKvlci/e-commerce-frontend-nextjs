import ProductCartCard from "@/components/cart/ProductCartCard";

export default async function CartPage() {
    return (
        <div>
            <ProductCartCard 
                product={{
                    productId: "1",
                    title: "Örnek Ürün",
                    description: "Bu bir örnek ürün açıklamasıdır.",
                    brandName: "Örnek Marka",
                    price: 199.99,
                    sellerId: 12345
                }} 
            />
            <ProductCartCard 
                product={{
                    productId: "1",
                    title: "Örnek Ürün",
                    description: "Bu bir örnek ürün açıklamasıdır.",
                    brandName: "Örnek Marka",
                    price: 199.99,
                    sellerId: 12345
                }} 
            />
            <ProductCartCard 
                product={{
                    productId: "1",
                    title: "Örnek Ürün",
                    description: "Bu bir örnek ürün açıklamasıdır.",
                    brandName: "Örnek Marka",
                    price: 199.99,
                    sellerId: 12345
                }} 
            />
            <ProductCartCard 
                product={{
                    productId: "1",
                    title: "Örnek Ürün",
                    description: "Bu bir örnek ürün açıklamasıdır.",
                    brandName: "Örnek Marka",
                    price: 199.99,
                    sellerId: 12345
                }} 
            />
        </div>
    )
}