import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useMediaQuery } from '@mui/material';

import NavigationBar from './NavigationBar';
import SideBar from './SideBar';
import { useSideBarOpen } from '../../hooks/sidebar';

/**
 * Component representing the layout of all pages in the whole application
 */
const Layout = () => {
  // if the minimum width is achieved on the screen then we know the client device is desktop
  const isDesktop = useMediaQuery('(min-width: 600px)');
  const [isSideBarOpen, toggleSideBar] = useSideBarOpen(true);

  return (
    <Box sx={{ width: '100%', height: '100%', display: isDesktop ? 'flex' : 'block' }}>
      <SideBar
        isOpen={isSideBarOpen}
        toggleOpen={toggleSideBar}
        isDesktop={isDesktop}
        drawerWidth="250px"
      />
      <Box>
        {/* All pages will have the navigation bar */}
        <NavigationBar toggleSideBar={toggleSideBar} />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
