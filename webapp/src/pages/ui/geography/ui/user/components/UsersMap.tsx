import React from 'react';
import { Box } from '@mui/material';
import { ResponsiveChoropleth } from '@nivo/geo';

import { useGetGeographyUsersQuery } from '@local/redux-store/api/api';
import { geographyMapData } from '@local/pages/ui/geography/models/geography-map-data';
import { UsersPerCountry } from '@local/pages/ui/geography/models/user-statistics';
import { useCustomTheme } from '@local/pages/ui/components/hooks/custom-theme';
import { getStatisticsTheme } from '@local/pages/theme/statistics-theme';

const UsersMap = () => {
  const theme = useCustomTheme();
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
        border: `1px solid ${theme.palette.secondary[200]}`,
        borderRadius: '4px',
      }}
    >
      {isLoading && <div>Loading products...</div>}
      {data && (
        <ResponsiveChoropleth
          data={getDataForMap(data.userStatistics as UsersPerCountry[])}
          theme={getStatisticsTheme(theme)}
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
              itemTextColor: theme.palette.secondary[200],
              itemOpacity: 0.85,
              symbolSize: 18,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: theme.palette.background.alt,
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
