import React from 'react';
import { useTheme, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { useGetCustomersQuery } from '../../../redux-store/api/api';
import Header from '../../components/Header';
import { UserRole } from '../../../models/user';

const columns = [
  // property 'flex' says how we want each column to grow, shrink and how much space it can take up
  { field: '_id', headerName: 'ID', flex: 1 },
  { field: 'name', headerName: 'Name', flex: 0.5 },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
  },
  {
    field: 'phoneNumber',
    headerName: 'Phone Number',
    flex: 0.5,
    // customization of rendering of the cell
    renderCell: (params: any) => params.value.replace(/^(\d{3})(\d{3})(\d{4})/, '($1)$2-$3'),
  },
  { field: 'country', headerName: 'Country', flex: 0.4 },
  {
    field: 'occupation',
    headerName: 'Occupation',
    flex: 1,
  },
  {
    field: 'role',
    headerName: 'Role',
    flex: 0.5,
    renderCell: (params: any) => renderRole(params.value),
  },
];
const renderRole = (value: UserRole): string => {
  switch (value) {
    case UserRole.USER:
      return 'User';
    case UserRole.ADMIN:
      return 'Admin';
    case UserRole.SUPER_ADMIN:
      return 'Super Admin';
    default:
      return 'Unknown role';
  }
};

const CustomerList = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCustomersQuery();

  return (
    <Box sx={{ margin: '1.5rem 2.5rem' }}>
      <Header title="Customers" subtitle="List of customers" />
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
          <DataGrid loading={isLoading} rows={data} columns={columns} getRowId={(row) => row._id} />
        </Box>
      )}
    </Box>
  );
};

export default CustomerList;
