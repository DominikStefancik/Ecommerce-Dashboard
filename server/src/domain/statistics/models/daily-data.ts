import { prop } from '@typegoose/typegoose';

export class DailyData {
  @prop({ required: true })
  public date!: string;

  @prop({ required: true })
  public totalSalesPrice!: number;

  @prop({ required: true })
  public totalSoldUnits!: number;
}
