import * as mongoose from 'mongoose';
import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'performance-statistics', timestamps: true } })
export class PerformanceStatistics {
  @prop({ required: true, ref: 'User' })
  public userId!: mongoose.Types.ObjectId;

  @prop({ required: true, ref: 'Transaction' })
  public affiliateSales!: mongoose.Types.ObjectId[];
}

export const PerformanceStatisticsModel = getModelForClass(PerformanceStatistics);
