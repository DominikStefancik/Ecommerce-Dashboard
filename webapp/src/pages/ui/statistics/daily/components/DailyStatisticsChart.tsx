import React, { useMemo, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ResponsiveLine } from '@nivo/line';

import { useGetOverallStatisticsQuery } from '@local/redux-store/api/api';
import { DailyData } from '@local/pages/models/daily-data';
import { LineChartCoordinates } from '@local/pages/ui/components/models/line-charts-coordinates';
import { useCustomTheme } from '@local/pages/ui/components/hooks/custom-theme';

const DailyStatisticsChart = () => {
  const theme = useCustomTheme();
  const [startDate, setStartDate] = useState(new Date('2021-02-01'));
  const [endDate, setEndDate] = useState(new Date('2021-03-01'));
  const { data, isLoading } = useGetOverallStatisticsQuery();

  // recalculate totalSalesLine and totalUnitsLine whenever one of the dependencies in the useMemo hook change
  const [dailyStatisticsData] = useMemo(() => {
    if (!data) {
      return [];
    }

    const dailyData = data.overallStatistics[0].dailyData as DailyData[];
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

    Object.values(dailyData).forEach(({ date, totalSalesPrice, totalSoldUnits }: DailyData) => {
      const convertedDate = new Date(date);

      if (convertedDate >= startDate && convertedDate <= endDate) {
        // the 'splitDate' will represent the day and the month of the date string
        const splitDate = date.substring(date.indexOf('-') + 1);

        totalSalesPriceLine.data.push({ x: splitDate, y: totalSalesPrice });
        totalSoldUnitsLine.data.push({ x: splitDate, y: totalSoldUnits });
      }
    });

    return [[totalSalesPriceLine, totalSoldUnitsLine]];
  }, [data, startDate, endDate]);

  return (
    <Box sx={{ height: '75vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <Box sx={{ marginRight: '1.5rem' }}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => {
                if (newValue) {
                  setStartDate(newValue);
                }
              }}
              inputFormat="dd/MM/yyyy"
              renderInput={(params) => <TextField {...params} />}
              disableFuture
            />
          </Box>
          <Box>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => {
                if (newValue) {
                  setEndDate(newValue);
                }
              }}
              inputFormat="dd/MM/yyyy"
              renderInput={(params) => <TextField {...params} />}
              disableFuture
            />
          </Box>
        </LocalizationProvider>
      </Box>
      {isLoading && <div>Loading overall statistics data...</div>}
      {dailyStatisticsData && (
        <ResponsiveLine
          data={dailyStatisticsData}
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

export default DailyStatisticsChart;
