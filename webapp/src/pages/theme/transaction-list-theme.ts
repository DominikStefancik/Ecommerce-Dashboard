import { Theme } from '@mui/material/styles/createTheme';

export const getTransactionListTheme = (theme: Theme) => ({
  '& .MuiDataGrid-root': { border: 'none' },
  '& .MuiDataGrid-cell': { borderBottom: 'none' },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.secondary.main,
    borderBottom: 'none',
  },
  '& .MuiDataGrid-virtualScroller': {
    backgroundColor: theme.palette.primary.light,
  },
  '& .MuiDataGrid-footerContainer': {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.secondary.main,
    borderTop: 'none',
  },
  '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
    color: `${theme.palette.secondary.main} !important`,
  },
});
