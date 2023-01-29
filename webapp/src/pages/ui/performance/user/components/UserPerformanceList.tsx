import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { useGetUserPerformanceQuery } from '@local/redux-store/api/api';
import DataGridCustomColumnMenu from '@local/pages/ui/components/DataGridCustomColumnMenu';
import { useCustomTheme } from '@local/pages/ui/components/hooks/custom-theme';

const userPerformanceColumns = [
  // property 'flex' says how we want each column to grow, shrink and how much space it can take up
  { field: '_id', headerName: 'ID', flex: 1 },
  { field: 'userId', headerName: 'User ID', flex: 1 },
  {
    field: 'createdAt',
    headerName: 'Created At',
    flex: 1,
  },
  {
    field: 'products',
    headerName: 'Product Count',
    flex: 0.5,
    sortable: false,
    renderCell: (parameters: any) => parameters.value.length,
  },
  {
    field: 'cost',
    headerName: 'Cost',
    flex: 1,
    renderCell: (parameters: any) => `$${Number(parameters.value).toFixed(2)}`,
  },
];

const UserPerformanceList = () => {
  const theme = useCustomTheme();
  const userId = useSelector((state: any) => state.global.userId);
  const { data, isLoading } = useGetUserPerformanceQuery(userId);

  return (
    <Box sx={{ margin: '1.5rem 2.5rem' }}>
      {data && (
        <Box
          sx={{
            'marginTop': '40px',
            'height': '75vh',
            '& .MuiDataGrid-root': { border: 'none' },
            '& .MuiDataGrid-cell': { borderBottom: 'none' },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: theme.palette.primary.light,
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: 'none',
            },
            '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading}
            rows={data.userWithStatistics.performanceStatistics.affiliateSales}
            columns={userPerformanceColumns}
            getRowId={(row) => row._id}
            components={{ ColumnMenu: DataGridCustomColumnMenu }}
          />
        </Box>
      )}
    </Box>
  );
};

export default UserPerformanceList;
