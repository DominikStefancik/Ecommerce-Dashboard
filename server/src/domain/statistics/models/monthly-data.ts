import { prop } from '@typegoose/typegoose';

enum Month {
  'January' = 'January',
  'February' = 'February',
  'March' = 'March',
  'April' = 'April',
  'May' = 'May',
  'June' = 'June',
  'July' = 'July',
  'August' = 'August',
  'September' = 'September',
  'October' = 'October',
  'November' = 'November',
  'December' = 'December',
}

export class MonthlyData {
  @prop({ required: true, enum: Month })
  public month!: Month;

  @prop({ required: true })
  public totalSalesPrice!: number;

  @prop({ required: true })
  public totalSoldUnits!: number;
}
