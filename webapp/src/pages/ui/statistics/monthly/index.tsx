import React from 'react';
import { Box } from '@mui/material';

import Header from '@local/pages/ui/components/Header';
import MonthlyStatisticsChart from '@local/pages/ui/statistics/monthly/components/MonthlyStatisticsChart';

const MonthlyStatisticsPage = () => {
  return (
    <Box sx={{ margin: '1.5rem 2.5rem' }}>
      <Header title="MONTHLY SALES" subtitle="Statistics of monthly sales" />
      <MonthlyStatisticsChart />
    </Box>
  );
};

export default MonthlyStatisticsPage;
