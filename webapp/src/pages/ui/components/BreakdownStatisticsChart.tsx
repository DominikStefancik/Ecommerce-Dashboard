import React from 'react';
import { useTheme, Box, Typography } from '@mui/material';
import { ResponsivePie } from '@nivo/pie';

import { useGetOverallStatisticsQuery } from '@local/redux-store/api/api';

interface BreakdownStatisticsChartProps {
  isDashboard?: boolean;
}

const BreakdownStatisticsChart = ({ isDashboard = false }: BreakdownStatisticsChartProps) => {
  const theme = useTheme();
  const { data, isLoading } = useGetOverallStatisticsQuery();
  const colors = [
    theme.palette.secondary.main,
    theme.palette.secondary.dark,
    theme.palette.secondary.dark,
    theme.palette.secondary.main,
  ];

  const pieChartData = Object.entries(
    (data && data.overallStatistics[0].salesByCategory) || []
  ).map(([category, sales], index) => ({
    id: category,
    label: category,
    value: sales,
    color: colors[index],
  }));

  return (
    <Box
      sx={{
        height: isDashboard ? '400px' : '100%',
        width: undefined,
        minHeight: isDashboard ? '325px' : undefined,
        minWidth: isDashboard ? '325px' : undefined,
        position: 'relative',
      }}
    >
      {isLoading && <div>Loading breakdown statistics data...</div>}
      {data && pieChartData && (
        /* we have to explicitly add 'Box' here as a parent container and set its height
         * otherwise the line chart will not be rendered
         * even though the height property is set in the Box element in a page component
         * where the BreakdownStatisticsChart is used
         **/
        <Box sx={{ height: isDashboard ? '45vh' : '75vh' }}>
          <ResponsivePie
            data={pieChartData}
            theme={{
              axis: {
                domain: {
                  line: { stroke: theme.palette.secondary.main },
                },
                legend: { text: { fill: theme.palette.secondary.main } },
                ticks: {
                  line: { stroke: theme.palette.secondary.main, strokeWidth: 1 },
                  text: { fill: theme.palette.secondary.main },
                },
              },
              legends: { text: { fill: theme.palette.secondary.main } },
              tooltip: { container: { color: theme.palette.primary.main } },
            }}
            colors={{ datum: 'data.color' }}
            margin={
              isDashboard
                ? { top: 40, right: 80, bottom: 100, left: 50 }
                : {
                    top: 40,
                    right: 80,
                    bottom: 80,
                    left: 80,
                  }
            }
            innerRadius={0.45}
            sortByValue={true}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0.2]],
            }}
            enableArcLinkLabels={!isDashboard}
            arcLinkLabelsTextColor={theme.palette.secondary.main}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: 'color',
              modifiers: [['darker', 2]],
            }}
            legends={[
              {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: isDashboard ? 20 : 0,
                translateY: isDashboard ? 50 : 56,
                itemsSpacing: 0,
                itemWidth: 85,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: theme.palette.primary.main,
                    },
                  },
                ],
              },
            ]}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              color: theme.palette.secondary.dark,
              textAlign: 'center',
              pointerEvents: 'none',
              transform: isDashboard ? 'translate(-75%, -170%)' : 'translate(-50%, -100%)',
            }}
          >
            <Typography variant="h6">
              {!isDashboard && 'Total:'} {data.overallStatistics[0].yearlySalesTotalPrice}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default BreakdownStatisticsChart;
