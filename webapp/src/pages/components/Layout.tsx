import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import NavigationBar from './NavigationBar';

/**
 * Component representing the layout of all pages in the whole application
 */
const Layout = () => {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box>
        {/* All pages will have the navigation bar */}
        <NavigationBar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
