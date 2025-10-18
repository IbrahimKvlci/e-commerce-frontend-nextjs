import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="text-center">
        <h1 className="text-4xl font-bold mb-4">E-Commerce Frontend</h1>
        <p className="text-lg text-gray-600">Ready to build your e-commerce application</p>
        <ProductCard
          product={{
            id: 1,
            name: "Sample Product",
            price: 24.99,
            image: "https://via.placeholder.com/300x400.png?text=Product+Image",
            description: "This is a sample product to showcase the ProductCard.",
            rating: 4.2
          }}
        />
      </main>
    </div>
  );
}
