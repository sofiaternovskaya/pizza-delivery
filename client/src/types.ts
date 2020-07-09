export type TProduct = {
  id: string;
  name: string;
  type: string;
  description: string;
  src: string;
  price_usd: number;
  price_eur: number;
};

export type TOrderItem = {
  id: string;
  quantity: number;
  price_usd: number;
  price_eur: number;
  product: TProduct[];
};

export type TOrder = {
  id: string;
  order_date: string;
  user_name: string;
  user_phone_number: string;
  user_address: string;
  order_items: TOrderItem[];
  delivery_usd: number;
  delivery_eur: number;
};

export type TDelivery = {
  id: string;
  delivery_usd: number;
  delivery_eur: number;
};

export type TCurrency = "usd" | "eur";

export type TProductsData = {
  products: TProduct[];
};
