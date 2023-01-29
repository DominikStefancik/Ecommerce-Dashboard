import React from 'react';
import { Box, Typography } from '@mui/material';
import { ResponsivePie } from '@nivo/pie';

import { useGetOverallStatisticsQuery } from '@local/redux-store/api/api';
import { useCustomTheme } from '@local/pages/ui/components/hooks/custom-theme';
import { getStatisticsTheme } from '@local/pages/theme/statistics-theme';

interface BreakdownStatisticsChartProps {
  isDashboard?: boolean;
}

const BreakdownStatisticsChart = ({ isDashboard = false }: BreakdownStatisticsChartProps) => {
  const theme = useCustomTheme();
  const { data, isLoading } = useGetOverallStatisticsQuery();
  const colors = [
    theme.palette.secondary[500],
    theme.palette.secondary[300],
    theme.palette.secondary[300],
    theme.palette.secondary[500],
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
            theme={getStatisticsTheme(theme)}
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
            arcLinkLabelsTextColor={theme.palette.secondary[200]}
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
                      itemTextColor: theme.palette.primary[500],
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
              color: theme.palette.secondary[400],
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
