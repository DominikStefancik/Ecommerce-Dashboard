import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from '@mui/x-data-grid';
import { Search } from '@mui/icons-material';

import { FlexBoxInBetween } from '@local/pages/ui/components/styled';

interface DataGridCustomToolbarProps {
  searchInput: string;
  setSearchInput: (input: string) => void;
  setSearch: (search: string) => void;
}

const DataGridCustomToolbar = ({
  searchInput,
  setSearchInput,
  setSearch,
}: DataGridCustomToolbarProps) => {
  return (
    <GridToolbarContainer>
      <FlexBoxInBetween sx={{ width: '100%' }}>
        <FlexBoxInBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBoxInBetween>
        <TextField
          label="Search..."
          value={searchInput}
          onChange={(element) => setSearchInput(element.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setSearch(searchInput);
                    setSearchInput('');
                  }}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ marginBottom: '0.5rem', width: '15rem' }}
        />
      </FlexBoxInBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
