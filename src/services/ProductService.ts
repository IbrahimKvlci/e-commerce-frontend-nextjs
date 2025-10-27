import { apiGet } from "@/lib/api";
import { DisplayProduct } from "@/models/DisplayProduct";

export default class ProductService{
    private API_URL=`${process.env.NEXT_PUBLIC_API_URL}/catalog/products`;

    async getAllDisplayProductsByCategoryId(id:number){
        const products:DisplayProduct[]=await apiGet(`${this.API_URL}/category/${id}/displayProducts`)
        return products;
    }
}