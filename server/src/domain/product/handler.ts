import { Logger } from 'pino';

import { ProductRepository } from '@local/domain/product/database/repository';
import { Product } from '@local/domain/product/database/model';
import { HandlerResponse } from '@local/interfaces/networking/endpoint-handler';
import { HttpResponseCode } from '@local/express/http/http-response-code';
import { DatabaseRepositories } from '@local/interfaces/database/repositories';
import { ProductStatisticsRepository } from '@local/domain/statistics/product-statistics/database/repository';
import { ProductStatistics } from '@local/domain/statistics/product-statistics/database/model';

type EnrichedProduct = Product & { statistics?: ProductStatistics };

export class ProductHandler {
  public constructor(
    private readonly repositories: Pick<DatabaseRepositories, 'product' | 'productStatistics'>,
    private readonly logger: Logger
  ) {}

  private get productRepository(): ProductRepository {
    return this.repositories.product;
  }

  private get productStatisticsRepository(): ProductStatisticsRepository {
    return this.repositories.productStatistics;
  }

  public async handleGet(id?: string): Promise<HandlerResponse<EnrichedProduct[]>> {
    this.logger.info({ id }, 'Handling GET request...');

    let products: EnrichedProduct[];

    if (id) {
      const product = await this.productRepository.getProduct(id);
      if (product) {
        const productStatistics =
          (await this.productStatisticsRepository.getSingleProductStatistics(product.name)) ??
          undefined;
        products = [{ ...product, statistics: productStatistics }];
      } else {
        products = [];
      }
    } else {
      const allProducts = await this.productRepository.getAllProducts();
      const productStatistics = await this.productStatisticsRepository.getAllProductsStatistics();

      products = this.matchProductsWithStatistics(allProducts, productStatistics);
    }

    return {
      code: HttpResponseCode.OK,
      payload: products,
    };
  }

  private matchProductsWithStatistics(
    products: Product[],
    productsStatistics: ProductStatistics[]
  ): EnrichedProduct[] {
    return products.map((product) => {
      const statistics = productsStatistics.find(
        (statistics) => product._id.toString() === statistics.productId
      );

      return { ...product, statistics };
    });
  }
}
