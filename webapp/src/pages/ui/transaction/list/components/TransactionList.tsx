import React, { useState } from 'react';
import { useTheme, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { useGetTransactionsQuery } from '@local/redux-store/api/api';
import DataGridCustomToolbar from '@local/pages/ui/transaction/list/components/DataGridCustomToolbar';

const columns = [
  // property 'flex' says how we want each column to grow, shrink and how much space it can take up
  { field: '_id', headerName: 'ID', flex: 1 },
  { field: 'userId', headerName: 'User ID', flex: 1 },
  {
    field: 'createdAt',
    headerName: 'CreatedAt',
    flex: 1,
  },
  {
    field: 'products',
    headerName: 'Number of Products',
    flex: 0.5,
    sortable: false,
    renderCell: (parameters: any) => parameters.value.length,
  },
  {
    field: 'cost',
    headerName: 'Cost',
    flex: 1,
    renderCell: (parameters: any) => `$${parameters.value.toFixed(2)}`,
  },
];

const TransactionList = () => {
  const theme = useTheme();

  // values which will be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  // search will be changed when a user clicks the search icon used inside the DataGridCustomToolbar
  const [search, setSearch] = useState('');
  // a temporary state of the search input
  // this will be changed everytime a user types
  const [searchInput, setSearchInput] = useState('');

  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  return (
    <Box sx={{ margin: '1.5rem 2.5rem' }}>
      <Box
        sx={{
          'height': '80vh',
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
          getRowId={(row) => row._id}
          rows={(data && data.transactions) ?? []}
          rowCount={(data && data.totalCount) ?? 0}
          rowsPerPageOptions={[20, 50, 100]}
          columns={columns}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => {
            const sort =
              newSortModel.length > 0
                ? {
                    field: newSortModel[0].field,
                    sort: newSortModel[0].sort,
                  }
                : {};
            setSort(sort);
          }}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{ toolbar: { searchInput, setSearchInput, setSearch } }}
        />
      </Box>
    </Box>
  );
};

export default TransactionList;
