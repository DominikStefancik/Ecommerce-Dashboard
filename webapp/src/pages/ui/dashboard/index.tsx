import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery, Box, Button } from '@mui/material';
import { DownloadOutlined, Email, PointOfSale, PersonAdd, Traffic } from '@mui/icons-material';

import { useGetDashboardStatisticsQuery } from '@local/redux-store/api/api';
import { FlexBoxInBetween } from '@local/pages/ui/components/styled';
import Header from '@local/pages/ui/components/Header';
import DashboardOverallStatisticsBox from '@local/pages/ui/dashboard/components/DashboardOverallStatisticsBox';
import OverallStatisticsChart from '@local/pages/ui/components/OverallStatisticsChart';
import { StatisticsView } from '@local/pages/ui/components/models/statistics-view';
import DashboardTransactionStatisticsList from '@local/pages/ui/dashboard/components/DashboardTransactionStatisticsList';
import DashboardBreakdownChart from '@local/pages/ui/dashboard/components/DashboardBreakdownChart';
import { useCustomTheme } from '@local/pages/ui/components/hooks/custom-theme';

const DashboardPage = () => {
  const theme = useCustomTheme();
  const isNonMediumScreen = useMediaQuery('(min-width: 1200px)');
  const globalState = useSelector((state: any) => state.global);
  const { year, month, day } = globalState;
  const { data, isLoading } = useGetDashboardStatisticsQuery(year);

  const overallStatisticsData = data && data.overallStatistics;
  const selectedMonthData = overallStatisticsData
    ? data.overallStatistics.monthlyData.find((monthlyData: any) => monthlyData.month === month)
    : [];
  const selectedDayData = overallStatisticsData
    ? data.overallStatistics.dailyData.find((dailyData: any) => dailyData.date === day)
    : [];

  return (
    <Box sx={{ margin: '1.5rem 2.5rem' }}>
      <FlexBoxInBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              color: theme.palette.background.alt,
              backgroundColor: theme.palette.secondary.light,
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px',
            }}
          >
            <DownloadOutlined sx={{ marginRight: '10px' }} />
            Download reports
          </Button>
        </Box>
      </FlexBoxInBetween>
      {isLoading && <div>Loading dashboard statistics data...</div>}
      {data && (
        <Box
          sx={{
            'marginTop': '20px',
            'display': 'grid',
            // split grid columns equally into 12 parts
            'gridTemplateColumns': 'repeat(12, 1fr)',
            'gridAutoRows': '160px',
            // gap between each column and row
            'gap': '20px',
            '& > div': { gridColumn: isNonMediumScreen ? undefined : 'span 12' },
          }}
        >
          <DashboardOverallStatisticsBox
            title="Total Customers"
            value={overallStatisticsData.totalCustomers}
            increase="+14%"
            description="Since last month"
            icon={<Email sx={{ color: theme.palette.secondary[300], fontSize: '26px' }} />}
          />
          <DashboardOverallStatisticsBox
            title="Sales Today"
            value={selectedDayData.totalSalesPrice}
            increase="+21%"
            description="Since last month"
            icon={<PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: '26px' }} />}
          />

          <Box
            sx={{
              gridColumn: 'span 8',
              gridRow: 'span 2',
              backgroundColor: theme.palette.background.alt,
              padding: '1rem',
              borderRadius: '0.55rem',
            }}
          >
            <OverallStatisticsChart view={StatisticsView.sales} isDashboard={true} />
          </Box>

          <DashboardOverallStatisticsBox
            title="Monthly Sales"
            value={selectedMonthData.totalSalesPrice}
            increase="+5%"
            description="Since last month"
            icon={<PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: '26px' }} />}
          />
          <DashboardOverallStatisticsBox
            title="Yearly Sales"
            value={overallStatisticsData.yearlySalesTotalPrice}
            increase="+43%"
            description="Since last year"
            icon={<Traffic sx={{ color: theme.palette.secondary[300], fontSize: '26px' }} />}
          />

          <DashboardTransactionStatisticsList transactions={data.transactions} />
          <DashboardBreakdownChart
            title="Sales by Category"
            description="Breakdown of real sales and information via category for revenue made for this year and
        total sales."
          />
        </Box>
      )}
    </Box>
  );
};

export default DashboardPage;
