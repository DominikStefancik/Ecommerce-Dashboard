import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { useGetAdminsQuery } from '@local/redux-store/api/api';
import DataGridCustomColumnMenu from '@local/pages/ui/components/DataGridCustomColumnMenu';
import { userColumns } from '@local/pages/models/data-grid-user-columns';
import { useCustomTheme } from '@local/pages/ui/components/hooks/custom-theme';
import { getTableListTheme } from '@local/pages/theme/table-list-theme';

const AdminList = () => {
  const theme = useCustomTheme();
  const { data, isLoading } = useGetAdminsQuery();

  return (
    <Box sx={{ margin: '1.5rem 2.5rem' }}>
      {data && (
        <Box
          sx={{
            marginTop: '40px',
            height: '75vh',
            ...getTableListTheme(theme),
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
