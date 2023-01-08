import React, { useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

import { themeSettings } from '@local/pages/theme';
import Layout from '@local/pages/ui/components/Layout';
import { Path } from '@local/pages/path';
import Dashboard from '@local/pages/ui/dashboard';
import ProductList from '@local/pages/ui/product/ui/list';
import CustomerList from '@local/pages/ui/customer/list';

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
