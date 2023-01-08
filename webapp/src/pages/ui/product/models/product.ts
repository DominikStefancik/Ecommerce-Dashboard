import { ProductStatistics } from './product-statistics';

export enum ProductCategory {
  Accessories = 'Accessories',
  Clothing = 'Clothing',
  Shoes = 'Shoes',
  Miscellaneous = 'Miscellaneous',
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  category: ProductCategory;
  rating: number;
  supply?: number;
  statistics: ProductStatistics;
  createdAt: Date;
  updatedAt: Date;
}
