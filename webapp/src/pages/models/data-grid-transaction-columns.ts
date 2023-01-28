export const transactionColumns = [
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
