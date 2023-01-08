import React, { useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

import { themeSettings } from './theme';
import Layout from './pages/components/Layout';
import { Path } from './path';
import Dashboard from './pages/dashboard';
import ProductList from './pages/product/ui/list';
import CustomerList from './pages/customer/list';

const WebApp = () => {
  const themeMode = useSelector((state: any) => state.global.themeMode);
  const theme = useMemo(() => createTheme(themeSettings(themeMode)), [themeMode]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        {/* CssBaseline resets everything regarding the CSS styles */}
        <CssBaseline />
        <Routes>
          <Route element={<Layout />}>
            <Route path={Path.HOME} element={<Navigate to={Path.DASHBOARD} replace />} />
            <Route path={Path.DASHBOARD} element={<Dashboard />} />
            <Route path={Path.PRODUCTS} element={<ProductList />} />
            <Route path={Path.CUSTOMERS} element={<CustomerList />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
};

export default WebApp;
