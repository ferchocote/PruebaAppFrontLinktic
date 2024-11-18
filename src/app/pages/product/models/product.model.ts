export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
  }
  
  export interface AddProductDto {
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
  }
  
  export interface UpdateProductDto {
    id: string;
    name?: string;
    description?: string;
    price?: number;
    stockQuantity: number;
  }