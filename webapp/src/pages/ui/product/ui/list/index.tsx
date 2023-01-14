import React from 'react';
import { Box } from '@mui/material';

import Header from '@local/pages/ui/components/Header';
import ProductList from '@local/pages/ui/product/ui/list/components/ProductList';

const ProductListPage = () => {
  return (
    <Box sx={{ margin: '1.5rem 2.5rem' }}>
      <Header title="PRODUCTS" subtitle="See your list of products" />
      <ProductList />
    </Box>
  );
};

export default ProductListPage;
