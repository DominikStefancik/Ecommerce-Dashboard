import React from 'react';
import { Box, Typography } from '@mui/material';

import BreakdownStatisticsChart from '@local/pages/ui/components/BreakdownStatisticsChart';
import { useCustomTheme } from '@local/pages/ui/components/hooks/custom-theme';

interface DashboardBreakdownChartProps {
  title: string;
  description: string;
}

const DashboardBreakdownChart = ({ title, description }: DashboardBreakdownChartProps) => {
  const theme = useCustomTheme();

  return (
    <Box
      sx={{
        gridColumn: 'span 4',
        gridRow: 'span 3',
        backgroundColor: theme.palette.background.alt,
        padding: '1.5rem',
        borderRadius: '0.55rem',
      }}
    >
      <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
        {title}
      </Typography>
      <BreakdownStatisticsChart isDashboard={true} />
      <Typography
        variant="h6"
        sx={{ color: theme.palette.secondary[200], padding: '0 0.6rem', fontSize: '0.8rem' }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default DashboardBreakdownChart;
