import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';

import { useGetOverallStatisticsQuery } from '@local/redux-store/api/api';
import { LineChartCoordinates } from '@local/pages/ui/components/models/line-charts-coordinates';
import { MonthlyData } from '@local/pages/models/monthly-data';
import { useCustomTheme } from '@local/pages/ui/components/hooks/custom-theme';

const MonthlyStatisticsChart = () => {
  const theme = useCustomTheme();
  const { data, isLoading } = useGetOverallStatisticsQuery();

  // recalculate totalSalesLine and totalUnitsLine whenever one of the dependencies in the useMemo hook change
  const [monthlyStatisticsData] = useMemo(() => {
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

    Object.values(monthlyData).forEach(
      ({ month, totalSalesPrice, totalSoldUnits }: MonthlyData) => {
        totalSalesPriceLine.data.push({ x: month, y: totalSalesPrice });
        totalSoldUnitsLine.data.push({ x: month, y: totalSoldUnits });
      }
    );

    return [[totalSalesPriceLine, totalSoldUnitsLine]];
  }, [data]);

  return (
    <Box sx={{ height: '75vh' }}>
      {isLoading && <div>Loading overall statistics data...</div>}
      {monthlyStatisticsData && (
        <ResponsiveLine
          data={monthlyStatisticsData}
          curve="catmullRom"
          theme={{
            axis: {
              domain: {
                line: { stroke: theme.palette.secondary[200] },
              },
              legend: { text: { fill: theme.palette.secondary[200] } },
              ticks: {
                line: { stroke: theme.palette.secondary[200], strokeWidth: 1 },
                text: { fill: theme.palette.secondary[200] },
              },
            },
            legends: { text: { fill: theme.palette.secondary[200] } },
            tooltip: { container: { color: theme.palette.primary.main } },
          }}
          animate={true}
          colors={{ datum: 'color' }}
          margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
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
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 90,
            legend: 'Month',
            legendOffset: 60,
            legendPosition: 'middle',
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Total',
            legendOffset: -50,
            legendPosition: 'middle',
          }}
          enableGridX={false}
          enableGridY={false}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: 'top-right',
              direction: 'column',
              justify: false,
              translateX: 25,
              translateY: -15,
              itemsSpacing: 3,
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
          ]}
        />
      )}
    </Box>
  );
};

export default MonthlyStatisticsChart;
