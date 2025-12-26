export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  category: string | null;
  price: number;
  active: boolean;
  created_at: string;
}

export interface ProductPrice {
  id: string;
  produto_id: number;
  peso: string;
  preco: number;
  estoque: number;
  ativo: boolean;
}

export interface ProductWithPrices extends Product {
  prices: ProductPrice[];
}

export interface CartItem {
  product: Product;
  price: ProductPrice;
  quantity: number;
  subtotal: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  valor_total: number;
  frete: number;
  endereco_entrega: Address;
  forma_pagamento: string;
  pagamento_id?: string;
  created_at: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  produto_id: number;
  peso: string;
  quantidade: number;
  preco_unitario: number;
  subtotal: number;
  product?: Product;
}

export interface Address {
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  nome: string;
  cpf: string;
  telefone: string;
  role: 'customer' | 'admin';
  created_at: string;
  updated_at: string;
}