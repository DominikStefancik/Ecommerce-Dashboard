import React from 'react';
import { Box, Typography } from '@mui/material';

import { useCustomTheme } from '@local/pages/ui/components/hooks/custom-theme';

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header = ({ title, subtitle }: HeaderProps) => {
  const theme = useCustomTheme();

  return (
    <Box>
      <Typography
        variant="h2"
        sx={{ color: theme.palette.secondary[100], fontWeight: 'bold', marginBottom: '5px' }}
      >
        {title}
      </Typography>
      <Typography variant="h5" sx={{ color: theme.palette.secondary[300] }}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
