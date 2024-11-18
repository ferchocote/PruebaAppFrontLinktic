export interface GetOrdersDto {
    id: string;
    productName: string;
    quantity: number;
    price: number;
    orderDate: string;
    status: string;
  }

export interface CreateOrderDto {
    orderDate: Date;
    number: number;
    user: string;
    orderItems: OrderItems[];
  }

  export interface OrderItems {
    product: string;
    quantity: number;
  }
  