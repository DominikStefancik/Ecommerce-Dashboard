import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Rating,
  CardActions,
  Button,
  Collapse,
} from '@mui/material';

import { Product as ProductModel } from '@local/pages/ui/product/models/product';
import { useCustomTheme } from '@local/pages/ui/components/hooks/custom-theme';

interface ProductCardProps {
  product: ProductModel;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const theme = useCustomTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: 'none',
        backgroundColor: theme.palette.background.alt,
        borderRadius: '0.55rem',
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14, color: theme.palette.secondary[700] }} gutterBottom>
          {product.category}
        </Typography>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography
          sx={{ marginBottom: '1.5rem', color: theme.palette.secondary[400] }}
          gutterBottom
        >
          ${product.price.toFixed(2)}
        </Typography>
        <Rating value={product.rating} readOnly />
        <Typography variant="body2">{product.description}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="text" size="small" onClick={() => setIsExpanded(!isExpanded)}>
          See more
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{ color: theme.palette.neutral[300] }}
      >
        <CardContent>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Id:</span> {product._id}
          </Typography>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Supply Left:</span> {product.supply}
          </Typography>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Yearly Sales This Year:</span>{' '}
            {product.statistics.yearlySalesTotalPrice}
          </Typography>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Yearly Units Sold This Year:</span>{' '}
            {product.statistics.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ProductCard;
