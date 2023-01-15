import React, { useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import Header from '@local/pages/ui/components/Header';
import { StatisticsView } from '@local/pages/ui/components/models/statistics-view';
import OverallStatisticsChart from '@local/pages/ui/components/OverallStatisticsChart';

const OverallStatisticsPage = () => {
  const [view, setView] = useState(StatisticsView.units);

  return (
    <Box sx={{ margin: '1.5rem 2.5rem' }}>
      <Header
        title="OVERALL STATISTICS"
        subtitle="Overall statistics of general revenue and profit"
      />
      <Box sx={{ height: '75vh' }}>
        <FormControl sx={{ marginTop: '1rem' }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(element) => setView(element.target.value as StatisticsView)}
          >
            <MenuItem value={StatisticsView.sales}>Sales</MenuItem>
            <MenuItem value={StatisticsView.units}>Units</MenuItem>
          </Select>
        </FormControl>
        <OverallStatisticsChart view={view} />
      </Box>
    </Box>
  );
};

export default OverallStatisticsPage;
