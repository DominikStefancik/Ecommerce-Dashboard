import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { State } from './redux-store';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

import { themeSettings } from './theme';

const WebApp = () => {
  const themeMode = useSelector((state: State) => state.themeMode);
  const theme = useMemo(() => createTheme(themeSettings(themeMode)), [themeMode]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        {/* CssBaseline resets everything regarding the CSS styles */}
        <CssBaseline />
      </ThemeProvider>
    </div>
  );
};

export default WebApp;
