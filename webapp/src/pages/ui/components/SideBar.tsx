import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
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
  SettingsOutlined,
} from '@mui/icons-material';

import { FlexBoxInBetween } from './styled';
import { Path } from '@local/pages/path';
import { User } from '@local/pages/models/user';
import { useCustomTheme } from '@local/pages/ui/components/hooks/custom-theme';
import profileImage from '@local/static/profile.jpeg';

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
  { name: 'Geography (Users)', icon: <PublicOutlined />, path: Path.GEOGRAPHY_USERS },
  { name: 'Sales', icon: null },
  { name: 'Overview', icon: <PointOfSaleOutlined />, path: Path.STATISTICS_OVERALL },
  {
    name: 'Daily',
    icon: <TodayOutlined />,
    path: Path.STATISTICS_DAILY,
  },
  { name: 'Monthly', icon: <CalendarMonthOutlined />, path: Path.STATISTICS_MONTHLY },
  { name: 'Breakdown', icon: <PieChartOutlined />, path: Path.STATISTICS_BREAKDOWN },
  {
    name: 'Management',
    icon: null,
  },
  { name: 'Admin', icon: <AdminPanelSettingsOutlined />, path: Path.ADMIN },
  { name: 'User Performance', icon: <TrendingUpOutlined />, path: Path.USER_PERFORMANCE },
];

interface SideBarProps {
  isOpen: boolean;
  toggleOpen: () => void;
  isDesktop: boolean;
  drawerWidth: string;
  user?: User;
}

const SideBar = ({ isOpen, toggleOpen, isDesktop, drawerWidth, user }: SideBarProps) => {
  const { pathname } = useLocation();
  const [activePage, setActivePage] = useState('');
  const navigate = useNavigate();
  const theme = useCustomTheme();

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
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
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
                          activePage === name ? theme.palette.secondary[300] : 'transparent',
                        color:
                          activePage === name
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          marginLeft: '2rem',
                          color:
                            activePage === name
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
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
          {user && (
            <Box sx={{ position: 'absolute', bottom: '2rem' }}>
              <Divider />
              <FlexBoxInBetween
                sx={{ textTransform: 'none', gap: '1rem', margin: '1.5rem 2rem 0 3rem' }}
              >
                <Box
                  component="img"
                  src={profileImage}
                  sx={{ height: '40px', width: '40px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <Box sx={{ textAlign: 'left' }}>
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      color: theme.palette.secondary[100],
                    }}
                  >
                    {user.firstName}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.8rem',
                      color: theme.palette.secondary[200],
                    }}
                  >
                    {user.occupation}
                  </Typography>
                </Box>
                <SettingsOutlined sx={{ color: theme.palette.secondary[300], fontSize: '25px' }} />
              </FlexBoxInBetween>
            </Box>
          )}
        </Drawer>
      )}
    </Box>
  );
};

export default SideBar;
