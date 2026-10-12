type Order = {
  id: number;
  name: string;
  user_id: number;
};

type OrderItem = {
  id: number;
  name: string;
  sku: string;
  price: number;
  order_id: number;
};

type NotFound = {
  status: "NOT_FOUND";
  orders: [];
};

type Found = {
  status: "FOUND";
  orders: (Order & { OrderItems: OrderItem[] })[];
};

export type Order_Status = NotFound | Found;
