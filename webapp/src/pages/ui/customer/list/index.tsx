import React from 'react';
import { Box } from '@mui/material';

import Header from '@local/pages/ui/components/Header';
import CustomerList from '@local/pages/ui/customer/list/components/CustomerList';

const CustomersListPage = () => {
  return (
    <Box sx={{ margin: '1.5rem 2.5rem' }}>
      <Header title="Customers" subtitle="List of customers" />
      <CustomerList />
    </Box>
  );
};

export default CustomersListPage;
