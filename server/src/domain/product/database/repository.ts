import { Logger } from 'pino';
import { mongoose } from '@typegoose/typegoose';
import { DocumentType } from '@typegoose/typegoose/lib/types';

import { Product, ProductModel } from '@local/domain/product/database/model';

export class ProductRepository {
  private readonly model: mongoose.Model<DocumentType<Product>>;

  public constructor(private readonly logger: Logger) {
    this.model = ProductModel;
  }

  public async getProduct(id: string): Promise<Product | null> {
    this.logger.info({ id }, 'Fetching a single product from the database');

    /*
     * By default, Mongoose queries return an instance of the Mongoose Document class.
     * Documents are much heavier than vanilla JavaScript objects, because they have a lot of internal state for change tracking.
     * Enabling the lean option tells Mongoose to skip instantiating a full Mongoose document and just give you the POJO.
     * */
    const product = await this.model.findById(id).lean();

    return product;
  }

  public async getProducts(filter: any): Promise<Product[]> {
    this.logger.info({ filter }, 'Fetching products from the database');

    const products = await this.model.find(filter).lean();

    return products;
  }

  public async getAllProducts(): Promise<Product[]> {
    return this.getProducts({});
  }
}
