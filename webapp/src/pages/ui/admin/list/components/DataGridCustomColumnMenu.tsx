import React from 'react';
import { GridColumnMenuContainer, GridFilterMenuItem, HideGridColMenuItem } from '@mui/x-data-grid';
import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef';

interface DataGridCustomColumnMenuProps {
  hideMenu: (event: React.SyntheticEvent) => void;
  currentColumn: GridColDef;
  open: boolean;
}

const DataGridCustomColumnMenu = ({
  hideMenu,
  currentColumn,
  open,
}: DataGridCustomColumnMenuProps) => {
  return (
    <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} open={open}>
      <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
      <HideGridColMenuItem onClick={hideMenu} column={currentColumn} />
    </GridColumnMenuContainer>
  );
};

export default DataGridCustomColumnMenu;
