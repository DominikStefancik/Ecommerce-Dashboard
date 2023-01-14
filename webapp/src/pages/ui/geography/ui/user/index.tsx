import React from 'react';
import { Box } from '@mui/material';

import Header from '@local/pages/ui/components/Header';
import UsersMap from '@local/pages/ui/geography/ui/user/components/UsersMap';

const GeographyUsersPage = () => {
  return (
    <Box sx={{ margin: '1.5rem 2.5rem' }}>
      <Header title="GEOGRAPHY (USERS)" subtitle="Find where your users are located" />
      <UsersMap />
    </Box>
  );
};

export default GeographyUsersPage;
