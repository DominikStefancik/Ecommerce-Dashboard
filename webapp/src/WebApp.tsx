import React, { useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

import { themeSettings } from '@local/pages/theme';
import Layout from '@local/pages/ui/components/Layout';
import { Path } from '@local/pages/path';
import DashboardPage from '@local/pages/ui/dashboard';
import ProductListPage from '@local/pages/ui/product/ui/list';
import TransactionListPage from '@local/pages/ui/transaction/list';
import GeographyUsersPage from '@local/pages/ui/geography/ui/user';
import CustomersListPage from '@local/pages/ui/customer/list';
import OverallStatisticsPage from '@local/pages/ui/statistics/overall';
import DailyStatisticsPage from '@local/pages/ui/statistics/daily';
import MonthlyStatisticsPage from '@local/pages/ui/statistics/monthly';
import BreakdownStatisticsPage from '@local/pages/ui/statistics/breakdown';
import AdminsListPage from '@local/pages/ui/admin/list';
import UserPerformancePage from '@local/pages/ui/performance/user';

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
            <Route path={Path.DASHBOARD} element={<DashboardPage />} />
            <Route path={Path.PRODUCTS} element={<ProductListPage />} />
            <Route path={Path.CUSTOMERS} element={<CustomersListPage />} />
            <Route path={Path.TRANSACTIONS} element={<TransactionListPage />} />
            <Route path={Path.GEOGRAPHY_USERS} element={<GeographyUsersPage />} />
            <Route path={Path.STATISTICS_OVERALL} element={<OverallStatisticsPage />} />
            <Route path={Path.STATISTICS_DAILY} element={<DailyStatisticsPage />} />
            <Route path={Path.STATISTICS_MONTHLY} element={<MonthlyStatisticsPage />} />
            <Route path={Path.STATISTICS_BREAKDOWN} element={<BreakdownStatisticsPage />} />
            <Route path={Path.ADMIN} element={<AdminsListPage />} />
            <Route path={Path.USER_PERFORMANCE} element={<UserPerformancePage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
};

export default WebApp;
