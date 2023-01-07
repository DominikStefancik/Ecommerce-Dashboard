import * as mongoose from 'mongoose';
import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';

export enum ProductCategory {
  Accessories = 'Accessories',
  Clothing = 'Clothing',
  Shoes = 'Shoes',
  Miscellaneous = 'Miscellaneous',
}

@modelOptions({ schemaOptions: { collection: 'products', timestamps: true } })
export class Product {
  @prop({ required: true })
  public _id!: mongoose.Types.ObjectId;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public price!: number;

  @prop()
  public description?: string;

  @prop({ enum: ProductCategory, required: true })
  public category!: ProductCategory;

  @prop({ required: true })
  public rating!: number;

  @prop()
  public supply?: number;
}

export const ProductModel = getModelForClass(Product);
