import React, { ReactElement } from 'react';
import { useTheme, Box, Typography } from '@mui/material';

import { FlexBoxInBetween } from '@local/pages/ui/components/styled';

interface StatisticsBoxProps {
  title: string;
  value: string;
  increase: string;
  description: string;
  icon: ReactElement;
}

const DashboardOverallStatisticsBox = ({
  title,
  value,
  increase,
  description,
  icon,
}: StatisticsBoxProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        gridColumn: 'span 2',
        gridRow: 'span 1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.25rem 1rem',
        flex: '1 1 100%',
        backgroundColor: theme.palette.background.default,
        borderRadius: '0.55rem',
      }}
    >
      <FlexBoxInBetween>
        <>
          <Typography variant="h6" sx={{ color: theme.palette.secondary.light }}>
            {title}
          </Typography>
          {icon}
        </>
      </FlexBoxInBetween>

      <Typography variant="h3" sx={{ fontWeight: '600', color: theme.palette.secondary.dark }}>
        {value}
      </Typography>

      <FlexBoxInBetween>
        <Typography variant="h5" sx={{ fontStyle: 'italic', color: theme.palette.secondary.light }}>
          {increase}
        </Typography>
        <Typography>{description}</Typography>
      </FlexBoxInBetween>
    </Box>
  );
};

export default DashboardOverallStatisticsBox;
