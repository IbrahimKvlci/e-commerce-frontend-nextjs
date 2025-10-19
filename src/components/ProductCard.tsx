import React from "react";

type Product = {
  id: string | number;
  name: string;
  price: number;
  image: string;
  description?: string;
  rating?: number;
};

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1 w-60 h-[480px] mx-auto">
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden">
        <a href={`/product/${product.id}`} className="block">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </a>
        
        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100">
          <svg className="w-6 h-6 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

    {/* Content */}
    <div className="p-4 flex flex-col flex-1 w-full">
        {/*Title */}
        <div className="h-[90px] w-full min-w-0 mb-4">
          {/* Product Name */}
          <a href={`/product/${product.id}`} className="hover:text-blue-600 transition-colors text-left block w-full h-[45px]">
              <h3 className="font-semibold text-base mb-2 text-gray-800 group-hover:text-blue-600 break-all leading-tight w-full min-w-0 line-clamp-2">
                  {product.name}
              </h3>
              </a>

              {/* Rating */}
              {product.rating !== undefined && (
              <div className="flex items-center mb-3">
                  <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                      <svg
                      key={i}
                      className={`w-4 h-4 ${
                          i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                  ))}
                  </div>
                  <span className="text-gray-500 text-sm ml-2 font-medium">
                  {product.rating.toFixed(1)}
                  </span>
              </div>
              )}
        </div>

        {/*Bottom Content*/}
        <div className="mt-auto">
            {/* Price */}
            <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                <span className="text-sm text-gray-500 line-through">${(product.price * 1.2).toFixed(2)}</span>
            </div>
            </div>

            {/* Add to Cart Button */}
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg text-sm">
            <span className="flex items-center justify-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                Add to Cart
            </span>
            </button>
        </div>

        
      </div>
    </div>
  );
};

export default ProductCard;
