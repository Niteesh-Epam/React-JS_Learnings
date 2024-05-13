export interface ProductVariant {
  size: string;
  price: string;
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  image: string;
  variants: ProductVariant[];
}
