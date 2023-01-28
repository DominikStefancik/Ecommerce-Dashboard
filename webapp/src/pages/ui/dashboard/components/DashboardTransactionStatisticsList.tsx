import React from 'react';
import { useTheme, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { getTransactionListTheme } from '@local/pages/theme/transaction-list-theme';
import { Transaction } from '@local/pages/models/transaction';
import { transactionColumns } from '@local/pages/models/data-grid-transaction-columns';

interface DashboardTransactionStatisticsListProps {
  transactions: Transaction[];
}

const DashboardTransactionStatisticsList = ({
  transactions,
}: DashboardTransactionStatisticsListProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        gridColumn: 'span 8',
        gridRow: 'span 3',
        ...getTransactionListTheme(theme),
      }}
    >
      <DataGrid
        getRowId={(row) => row._id}
        rows={transactions ?? []}
        columns={transactionColumns}
      />
    </Box>
  );
};

export default DashboardTransactionStatisticsList;