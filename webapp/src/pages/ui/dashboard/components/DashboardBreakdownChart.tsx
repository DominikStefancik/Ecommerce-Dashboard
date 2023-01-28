import React from 'react';
import { useTheme, Box, Typography } from '@mui/material';

import BreakdownStatisticsChart from '@local/pages/ui/components/BreakdownStatisticsChart';

interface DashboardBreakdownChartProps {
  title: string;
  description: string;
}

const DashboardBreakdownChart = ({ title, description }: DashboardBreakdownChartProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        gridColumn: 'span 4',
        gridRow: 'span 3',
        // backgroundColor: theme.palette.secondary.light,
        padding: '1.5rem',
        borderRadius: '0.55rem',
      }}
    >
      <Typography variant="h6" sx={{ color: theme.palette.secondary.light }}>
        {title}
      </Typography>
      <BreakdownStatisticsChart isDashboard={true} />
      <Typography
        variant="h6"
        sx={{ color: theme.palette.secondary.dark, padding: '0 0.6rem', fontSize: '0.8rem' }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default DashboardBreakdownChart;
