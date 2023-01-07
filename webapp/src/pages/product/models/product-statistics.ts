import { MonthlyData } from './monthly-data';
import { DailyData } from './daily-data';

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
