import React from 'react';
import { Box } from '@mui/material';

import Header from '@local/pages/ui/components/Header';
import DailyStatisticsChart from '@local/pages/ui/statistics/daily/components/DailyStatisticsChart';

const DailyStatisticsPage = () => {
  return (
    <Box sx={{ margin: '1.5rem 2.5rem' }}>
      <Header title="DAILY SALES" subtitle="Statistics of daily sales" />
      <DailyStatisticsChart />
    </Box>
  );
};

export default DailyStatisticsPage;
