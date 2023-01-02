import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useTheme,
  Box,
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ChevronLeft,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  PieChartOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  ChevronRightOutlined,
} from '@mui/icons-material';

import { FlexBoxInBetween } from './styled';
import { Path } from '../../path';

const sections = [
  { name: 'Dashboard', icon: <HomeOutlined />, path: Path.DASHBOARD },
  {
    name: 'Client Facing',
    icon: null,
  },
  { name: 'Products', icon: <ShoppingCartOutlined />, path: Path.PRODUCTS },
  { name: 'Customers', icon: <Groups2Outlined />, path: Path.CUSTOMERS },
  {
    name: 'Transactions',
    icon: <ReceiptLongOutlined />,
    path: Path.TRANSACTIONS,
  },
  { name: 'Geography', icon: <PublicOutlined />, path: Path.GEOGRAPHY },
  { name: 'Sales', icon: null },
  { name: 'Overview', icon: <PointOfSaleOutlined />, path: Path.SALES_OVERVIEW },
  {
    name: 'Daily',
    icon: <TodayOutlined />,
    path: Path.SALES_DAILY,
  },
  { name: 'Monthly', icon: <CalendarMonthOutlined />, path: Path.SALES_MONTHLY },
  { name: 'Breakdown', icon: <PieChartOutlined />, path: Path.SALES_BREAKDOWN },
  {
    name: 'Management',
    icon: null,
  },
  { name: 'Admin', icon: <AdminPanelSettingsOutlined />, path: Path.ADMIN },
  { name: 'Performance', icon: <TrendingUpOutlined />, path: Path.PERFORMANCE },
];

interface SideBarProps {
  isOpen: boolean;
  toggleOpen: () => void;
  isDesktop: boolean;
  drawerWidth: string;
}

const SideBar = ({ isOpen, toggleOpen, isDesktop, drawerWidth }: SideBarProps) => {
  const { pathname } = useLocation();
  const [activePage, setActivePage] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    // every time the URL pathname changes we set the active page to the current page
    setActivePage(pathname.substring(1));
  }, [pathname]);

  const listItemClickHandler = (name: string, path: Path) => {
    navigate(path);
    setActivePage(name);
  };

  return (
    <Box component="nav">
      {isOpen && (
        <Drawer
          open={isOpen}
          variant="persistent"
          anchor="left"
          sx={{
            'width': drawerWidth,
            '& .MuiDrawer-paper': {
              color: theme.palette.secondary.main,
              backgroundColor: theme.palette.background.default,
              boxSizing: 'border-box',
              borderWidth: isDesktop ? 0 : '2px',
              width: drawerWidth,
              transition: '1s',
            },
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Box sx={{ margin: '1.5rem 2rem 2rem 3rem' }}>
              <FlexBoxInBetween color={theme.palette.secondary.main}>
                <Box sx={{ alignItems: 'center', display: 'flex', gap: '0.5rem' }}>
                  <Typography variant="h4" fontWeight="bold">
                    EComm Dashboard
                  </Typography>
                </Box>
                {!isDesktop && (
                  <IconButton onClick={() => toggleOpen()}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBoxInBetween>
            </Box>
            <List>
              {sections.map(({ name, icon, path }) => {
                // if icon doesn't exist, it means the item is a subsection
                if (!icon) {
                  return (
                    <Typography key={name} sx={{ margin: '2.25rem 0 1rem 3rem' }}>
                      {name}
                    </Typography>
                  );
                }

                return (
                  <ListItem key={name} disablePadding>
                    <ListItemButton
                      onClick={() => listItemClickHandler(name, path!)}
                      sx={{
                        backgroundColor:
                          activePage === name ? theme.palette.secondary.main : 'transparent',
                        color:
                          activePage === name
                            ? theme.palette.primary.main
                            : theme.palette.secondary.main,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          marginLeft: '2rem',
                          color:
                            activePage === name
                              ? theme.palette.primary.main
                              : theme.palette.secondary.main,
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={name} />
                      {activePage === name && <ChevronRightOutlined sx={{ marginLeft: 'auto' }} />}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default SideBar;
