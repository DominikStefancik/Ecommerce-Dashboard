import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';

import { StatisticsView } from '@local/pages/ui/components/models/statistics-view';
import { useGetOverallStatisticsQuery } from '@local/redux-store/api/api';
import { MonthlyData } from '@local/pages/models/monthly-data';
import { useCustomTheme } from '@local/pages/ui/components/hooks/custom-theme';
import { getStatisticsTheme } from '@local/pages/theme/statistics-theme';

interface OverallStatisticsChartProps {
  view: StatisticsView;
  isDashboard?: boolean;
}

type LineChartCoordinates = {
  x: number | string | Date;
  y: number | string | Date;
};

const OverallStatisticsChart = ({ view, isDashboard = false }: OverallStatisticsChartProps) => {
  const theme = useCustomTheme();
  const { data, isLoading } = useGetOverallStatisticsQuery();

  // recalculate totalSalesLine and totalUnitsLine whenever one of the dependencies in the useMemo hook change
  const [totalSalesPriceLine, totalSoldUnitsLine] = useMemo(() => {
    if (!data) {
      return [];
    }

    const monthlyData = data.overallStatistics[0].monthlyData as MonthlyData[];
    // object in this format is required by the Nivo line chart
    const totalSalesPriceLine = {
      id: 'totalSalesPrice',
      color: theme.palette.secondary.main,
      data: [] as LineChartCoordinates[],
    };
    const totalSoldUnitsLine = {
      id: 'totalSoldUnits',
      color: theme.palette.secondary[600],
      data: [] as LineChartCoordinates[],
    };

    Object.values(monthlyData).reduce(
      (
        previousValue: { sales: number; units: number },
        { month, totalSalesPrice, totalSoldUnits }: MonthlyData
      ) => {
        const currentSalesPrice = previousValue.sales + totalSalesPrice;
        const currentSoldUnits = previousValue.units + totalSoldUnits;

        totalSalesPriceLine.data.push({ x: month, y: currentSalesPrice });
        totalSoldUnitsLine.data.push({ x: month, y: currentSoldUnits });

        return { sales: currentSalesPrice, units: currentSoldUnits };
      },
      { sales: 0, units: 0 }
    );

    return [[totalSalesPriceLine], [totalSoldUnitsLine]];
  }, [data]);

  return (
    <div>
      {isLoading && <div>Loading overall statistics data...</div>}
      {totalSalesPriceLine && totalSoldUnitsLine && (
        /* we have to explicitly add 'Box' here as a parent container and set its height
         * otherwise the line chart will not be rendered
         * even though the height property is set in the Box element in a page component
         * where the OverallStatisticsChart is used
         **/
        <Box sx={{ height: isDashboard ? '33vh' : '75vh' }}>
          <ResponsiveLine
            data={view === StatisticsView.sales ? totalSalesPriceLine : totalSoldUnitsLine}
            curve="catmullRom"
            theme={getStatisticsTheme(theme)}
            animate={true}
            margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
            xScale={{ type: 'point' }}
            yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: false,
              reverse: false,
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              format: (value) => {
                if (isDashboard) {
                  return value.slice(0.3);
                }

                return value;
              },
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: !isDashboard ? 'Month' : '',
              legendOffset: 36,
              legendPosition: 'middle',
            }}
            axisLeft={{
              tickValues: 5,
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: !isDashboard
                ? `Total ${view === StatisticsView.sales ? 'Revenue' : 'Units'} for year`
                : '',
              legendOffset: -60,
              legendPosition: 'middle',
            }}
            enableGridX={false}
            enableGridY={false}
            enableArea={isDashboard}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={
              !isDashboard
                ? [
                    {
                      anchor: 'bottom-right',
                      direction: 'column',
                      justify: false,
                      translateX: 30,
                      translateY: -40,
                      itemsSpacing: 0,
                      itemDirection: 'left-to-right',
                      itemWidth: 80,
                      itemHeight: 20,
                      itemOpacity: 0.75,
                      symbolSize: 12,
                      symbolShape: 'circle',
                      symbolBorderColor: 'rgba(0, 0, 0, .5)',
                      effects: [
                        {
                          on: 'hover',
                          style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1,
                          },
                        },
                      ],
                    },
                  ]
                : undefined
            }
          />
        </Box>
      )}
    </div>
  );
};

export default OverallStatisticsChart;
