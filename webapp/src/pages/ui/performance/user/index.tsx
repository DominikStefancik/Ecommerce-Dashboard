import React from 'react';
import { Box } from '@mui/material';

import Header from '@local/pages/ui/components/Header';
import UserPerformanceList from '@local/pages/ui/performance/user/components/UserPerformanceList';

const UserPerformancePage = () => {
  return (
    <Box sx={{ margin: '1.5rem 2.5rem' }}>
      <Header title="USER PERFORMANCE" subtitle="Track you affiliate sales performance" />
      <UserPerformanceList />
    </Box>
  );
};

export default UserPerformancePage;
