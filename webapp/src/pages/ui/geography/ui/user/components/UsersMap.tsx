import React from 'react';
import { useTheme, Box } from '@mui/material';
import { ResponsiveChoropleth } from '@nivo/geo';

import { useGetGeographyUsersQuery } from '@local/redux-store/api/api';
import { geographyMapData } from '@local/pages/ui/geography/models/geography-map-data';
import { UsersPerCountry } from '@local/pages/ui/geography/models/user-statistics';

const UsersMap = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetGeographyUsersQuery();

  const getDataForMap = (usersStatsData: UsersPerCountry[]) => {
    return usersStatsData.map((userData) => ({
      id: userData.countryCode,
      value: userData.usersCount,
    }));
  };

  const getDomainRange = (usersStatsData: UsersPerCountry[]) => {
    const values = usersStatsData.map((userData) => userData.usersCount);
    const maxValue = Math.max(...values);

    return [0, maxValue % 10 === 0 ? maxValue : Math.ceil(maxValue / 10) * 10];
  };

  return (
    <Box
      sx={{
        marginTop: '40px',
        height: '75vh',
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: '4px',
      }}
    >
      {isLoading && <div>Loading products...</div>}
      {data && (
        <ResponsiveChoropleth
          data={getDataForMap(data.userStatistics as UsersPerCountry[])}
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
          features={geographyMapData.features}
          margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
          domain={getDomainRange(data.userStatistics)}
          unknownColor="#666666"
          label="properties.name"
          valueFormat=".2s"
          projectionScale={150}
          projectionTranslation={[0.45, 0.6]}
          projectionRotation={[0, 0, 0]}
          borderWidth={1.3}
          borderColor="#C8C8C8"
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: true,
              translateX: 0,
              translateY: -125,
              itemsSpacing: 0,
              itemWidth: 94,
              itemHeight: 18,
              itemDirection: 'left-to-right',
              itemTextColor: theme.palette.secondary.main,
              itemOpacity: 0.85,
              symbolSize: 18,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: theme.palette.background.default,
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

export default UsersMap;
