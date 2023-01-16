import { prop, modelOptions, getModelForClass, PropType } from '@typegoose/typegoose';

import { MonthlyData } from '@local/domain/statistics/models/monthly-data';
import { DailyData } from '@local/domain/statistics/models/daily-data';

@modelOptions({ schemaOptions: { collection: 'overall-statistics', timestamps: true } })
export class OverallStatistics {
  @prop({ required: true })
  public totalCustomers!: number;

  @prop({ required: true })
  public yearlySalesTotalPrice!: number;

  @prop({ required: true })
  public yearlyTotalSoldUnits!: number;

  @prop({ required: true })
  public year!: number;

  @prop({ required: true, type: () => [MonthlyData] })
  public monthlyData!: MonthlyData[];

  @prop({ required: true, type: () => [DailyData] })
  public dailyData!: DailyData[];

  @prop({ required: true, type: () => Number }, PropType.MAP)
  public salesByCategory!: Map<string, number>;
}

export const OverallStatisticsModel = getModelForClass(OverallStatistics);
