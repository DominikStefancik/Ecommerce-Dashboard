import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { useGetCustomersQuery } from '@local/redux-store/api/api';
import { userColumns } from '@local/pages/models/data-grid-user-columns';
import { useCustomTheme } from '@local/pages/ui/components/hooks/custom-theme';

const CustomerList = () => {
  const theme = useCustomTheme();
  const { data, isLoading } = useGetCustomersQuery();

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
            rows={data}
            columns={userColumns}
            getRowId={(row) => row._id}
          />
        </Box>
      )}
    </Box>
  );
};

export default CustomerList;
