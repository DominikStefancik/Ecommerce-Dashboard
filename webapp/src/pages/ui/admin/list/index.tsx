import React from 'react';
import { Box } from '@mui/material';

import Header from '@local/pages/ui/components/Header';
import AdminList from '@local/pages/ui/admin/list/components/AdminList';

const AdminsListPage = () => {
  return (
    <Box sx={{ margin: '1.5rem 2.5rem' }}>
      <Header title="Admins" subtitle="Managing admins and list of admins" />
      <AdminList />
    </Box>
  );
};

export default AdminsListPage;
