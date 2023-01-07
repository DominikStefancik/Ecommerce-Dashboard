import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';
import { Product } from '@local/domain/product/database/model';
import { MonthlyData } from '@local/domain/statistics/models/monthly-data';
import { DailyData } from '@local/domain/statistics/models/daily-data';

@modelOptions({ schemaOptions: { collection: 'product-statistics', timestamps: true } })
export class ProductStatistics {
  @prop({ required: true, ref: Product })
  public productId!: string;

  @prop({ required: true, default: 0 })
  public yearlySalesTotalPrice!: number;

  @prop({ required: true })
  public yearlyTotalSoldUnits!: number;

  @prop({ required: true })
  public year!: number;

  @prop({ required: true, type: () => [MonthlyData] })
  public monthlyData!: MonthlyData[];

  @prop({ required: true, type: () => [DailyData] })
  public dailyData!: DailyData[];
}

export const ProductStatisticsModel = getModelForClass(ProductStatistics);
