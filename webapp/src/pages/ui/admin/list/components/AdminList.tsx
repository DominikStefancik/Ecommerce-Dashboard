import React from 'react';
import { useTheme, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { useGetAdminsQuery } from '@local/redux-store/api/api';
import DataGridCustomColumnMenu from '@local/pages/ui/admin/list/components/DataGridCustomColumnMenu';
import { userColumns } from '@local/pages/models/data-grid-user-columns';

const AdminList = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetAdminsQuery();

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
              backgroundColor: theme.palette.background.default,
              color: theme.palette.secondary.main,
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: theme.palette.primary.light,
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: theme.palette.background.default,
              color: theme.palette.secondary.main,
              borderTop: 'none',
            },
            '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
              color: `${theme.palette.secondary.main} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading}
            rows={data}
            columns={userColumns}
            getRowId={(row) => row._id}
            components={{ ColumnMenu: DataGridCustomColumnMenu }}
          />
        </Box>
      )}
    </Box>
  );
};

export default AdminList;
