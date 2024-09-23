export interface IProduct {
  _id?: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image_url?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
