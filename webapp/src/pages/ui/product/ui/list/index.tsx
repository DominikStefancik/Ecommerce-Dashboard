import React from 'react';
import { Box, useMediaQuery } from '@mui/material';

import Header from '@local/pages/ui/components/Header';
import { useGetProductsQuery } from '@local/redux-store/api/api';
import { Product } from '@local/pages/ui/product/models/product';
import ProductCard from '@local/pages/ui/product/ui/components/ProductCard';

const ProductList = () => {
  // if the minimum width is achieved on the screen then we know the client device is desktop
  const isDesktop = useMediaQuery('(min-width: 1000px)');
  const { data, isLoading } = useGetProductsQuery();

  return (
    <Box sx={{ margin: '1.5rem 2.5rem' }}>
      <Header title="PRODUCTS" subtitle="See your list of products" />
      {isLoading && <div>Loading products...</div>}
      {data && (
        <Box
          sx={{
            'marginTop': '20px',
            'display': 'grid',
            'gridTemplateColumns': 'repeat(4, minmax(0, 1fr))',
            'justifyContent': 'space-between',
            'rowGap': '20px',
            'columnGap': '1.33%',
            // this represents any DIV child element of the Box element
            '& > div': { gridColumn: !isDesktop ? 'span 4' : undefined },
          }}
        >
          {data.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProductList;
