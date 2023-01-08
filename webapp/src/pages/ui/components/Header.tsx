import React from 'react';
import { useTheme, Box, Typography } from '@mui/material';

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header = ({ title, subtitle }: HeaderProps) => {
  const theme = useTheme();

  return (
    <Box>
      <Typography
        variant="h2"
        sx={{ color: theme.palette.secondary.main, fontWeight: 'bold', marginBottom: '5px' }}
      >
        {title}
      </Typography>
      <Typography variant="h5" sx={{ color: theme.palette.secondary.main }}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
