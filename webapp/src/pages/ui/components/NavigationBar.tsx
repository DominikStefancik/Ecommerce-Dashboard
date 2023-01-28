import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  useTheme,
  AppBar,
  Toolbar,
  IconButton,
  Input,
  Button,
  Box,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search,
  DarkModeOutlined,
  LightModeOutlined,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from '@mui/icons-material';

import { FlexBoxInBetween } from './styled';
import { setTheme } from '@local/redux-store/index';
import { ThemeMode } from '@local/pages/theme/theme';
import { User } from '@local/pages/models/user';

interface NavigationBarProps {
  toggleSideBar: () => void;
  user?: User;
}

const NavigationBar = ({ toggleSideBar, user }: NavigationBarProps) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [anchorElement, setAnchorElement] = useState(null);
  const isMenuOpen = Boolean(anchorElement);

  // @ts-ignore
  const handleChangeTheme = () => dispatch(setTheme());
  const handleMenuButtonClick = (event: any) => setAnchorElement(event.currentTarget);
  const handleCloseMenu = () => setAnchorElement(null);

  return (
    <AppBar sx={{ position: 'static', background: 'none', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* LEFT SIDE */}
        <FlexBoxInBetween>
          <IconButton onClick={() => toggleSideBar()}>
            <MenuIcon />
          </IconButton>
          <FlexBoxInBetween
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
            sx={{ backgroundColor: theme.palette.background.default }}
          >
            <Input placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBoxInBetween>
        </FlexBoxInBetween>

        {/* RIGHT SIDE */}
        <FlexBoxInBetween gap="1.5rem">
          <IconButton onClick={handleChangeTheme}>
            {theme.palette.mode === ThemeMode.dark ? (
              <DarkModeOutlined sx={{ fontSize: '25px' }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: '25px' }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: '25px' }} />
          </IconButton>
          {user && (
            <FlexBoxInBetween>
              <Button
                onClick={handleMenuButtonClick}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textTransform: 'none',
                  gap: '1rem',
                }}
              >
                <Box
                  component="img"
                  src=""
                  sx={{ height: '32px', width: '32px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <Box sx={{ textAlign: 'left' }}>
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '0.85rem',
                      color: theme.palette.secondary.main,
                    }}
                  >
                    {user.firstName}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.75rem',
                      color: theme.palette.secondary.main,
                    }}
                  >
                    {user.occupation}
                  </Typography>
                </Box>
                <ArrowDropDownOutlined
                  sx={{ color: theme.palette.secondary.light, fontSize: '25px' }}
                />
              </Button>
              <Menu
                anchorEl={anchorElement}
                open={isMenuOpen}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              >
                <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
              </Menu>
            </FlexBoxInBetween>
          )}
        </FlexBoxInBetween>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
