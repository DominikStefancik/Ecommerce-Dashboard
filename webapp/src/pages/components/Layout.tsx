import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, useMediaQuery } from '@mui/material';

import NavigationBar from './NavigationBar';
import SideBar from './SideBar';
import { useSideBarOpen } from '../../hooks/sidebar';
import { useGetUserQuery } from '../../redux-store/api/api';

/**
 * Component representing the layout of all pages in the whole application
 */
const Layout = () => {
  // if the minimum width is achieved on the screen then we know the client device is desktop
  const isDesktop = useMediaQuery('(min-width: 600px)');
  const [isSideBarOpen, toggleSideBar] = useSideBarOpen(true);
  const userId = useSelector((state: any) => state.global.userId);
  // use the hook to execute api call to get the user data
  const { data } = useGetUserQuery(userId);

  return (
    <Box sx={{ width: '100%', height: '100%', display: isDesktop ? 'flex' : 'block' }}>
      <SideBar
        isOpen={isSideBarOpen}
        toggleOpen={toggleSideBar}
        isDesktop={isDesktop}
        drawerWidth="250px"
        user={data}
      />
      <Box sx={{ flexGrow: 1 }}>
        {/* All pages will have the navigation bar */}
        <NavigationBar toggleSideBar={toggleSideBar} user={data} />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
