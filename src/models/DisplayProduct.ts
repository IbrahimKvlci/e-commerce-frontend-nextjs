export interface DisplayProduct {
  productId: number;
  title: string;
  description?: string;
  brandName: string;
  price: number;
  discountPrice: number;
  sellerId: number;
  imagesUrl: string[];
}
