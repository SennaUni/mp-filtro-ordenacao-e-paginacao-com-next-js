export type OrdersContent = {
  data: OrdersData[];
  links: Links;
  meta: Meta;
};

export interface OrdersData {
  id: number;
  customer_name: string;
  customer_email: string;
  order_date: Date;
  amount_in_cents: number;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface Links {
  first: string;
  last: string;
  prev: any;
  next: string;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Link {
  url?: string;
  label: string;
  active: boolean;
}
