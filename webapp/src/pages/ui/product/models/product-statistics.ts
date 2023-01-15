import { MonthlyData } from '@local/pages/models/monthly-data';
import { DailyData } from '@local/pages/models/daily-data';

export interface ProductStatistics {
  productId: string;
  yearlySalesTotalPrice: number;
  yearlyTotalSoldUnits: number;
  year: number;
  monthlyData: MonthlyData[];
  dailyData: DailyData[];
  createdAt: Date;
  updatedAt: Date;
}
