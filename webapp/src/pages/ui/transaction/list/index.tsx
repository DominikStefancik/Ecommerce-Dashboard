import React from 'react';
import { Box } from '@mui/material';

import Header from '@local/pages/ui/components/Header';
import TransactionList from '@local/pages/ui/transaction/list/components/TransactionList';

const TransactionListPage = () => {
  return (
    <Box sx={{ margin: '1.5rem 2.5rem' }}>
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
      <TransactionList />
    </Box>
  );
};

export default TransactionListPage;
