import React from 'react';
import { Box } from '@mui/material';

import Header from '@local/pages/ui/components/Header';
import BreakdownStatisticsChart from '@local/pages/ui/components/BreakdownStatisticsChart';

const BreakdownStatisticsPage = () => {
  return (
    <Box sx={{ margin: '1.5rem 2.5rem' }}>
      <Header title="BREAKDOWN STATISTICS" subtitle="Breakdown statistics of Sales by a category" />
      <Box sx={{ height: '75vh', marginTop: '40px' }}>
        <BreakdownStatisticsChart />
      </Box>
    </Box>
  );
};

export default BreakdownStatisticsPage;
