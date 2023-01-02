import React from 'react';
import { useDispatch } from 'react-redux';
import { useTheme, AppBar, Toolbar, IconButton, Input } from '@mui/material';
import {
  Menu as MenuIcon,
  Search,
  DarkModeOutlined,
  LightModeOutlined,
  SettingsOutlined,
} from '@mui/icons-material';

import { FlexBoxInBetween } from './styled';
import { setTheme } from '../../redux-store';
import { ThemeMode } from '../../theme';

const NavigationBar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <AppBar sx={{ position: 'static', background: 'none', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* LEFT SIDE */}
        <FlexBoxInBetween>
          <IconButton onClick={() => console.log('Open/Close sidebar')}>
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
          <IconButton onClick={() => dispatch(setTheme())}>
            {theme.palette.mode === ThemeMode.dark ? (
              <DarkModeOutlined sx={{ fontSize: '25px' }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: '25px' }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: '25px' }} />
          </IconButton>
        </FlexBoxInBetween>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
