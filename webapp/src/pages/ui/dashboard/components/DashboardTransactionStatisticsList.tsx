import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { getTableListTheme } from '@local/pages/theme/table-list-theme';
import { Transaction } from '@local/pages/models/transaction';
import { transactionColumns } from '@local/pages/models/data-grid-transaction-columns';
import { useCustomTheme } from '@local/pages/ui/components/hooks/custom-theme';

interface DashboardTransactionStatisticsListProps {
  transactions: Transaction[];
}

const DashboardTransactionStatisticsList = ({
  transactions,
}: DashboardTransactionStatisticsListProps) => {
  const theme = useCustomTheme();

  return (
    <Box
      sx={{
        gridColumn: 'span 8',
        gridRow: 'span 3',
        ...getTableListTheme(theme),
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
