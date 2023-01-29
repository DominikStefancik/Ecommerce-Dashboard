import { CustomTheme } from '@local/pages/theme/theme';

export const getTransactionListTheme = (theme: CustomTheme) => ({
  '& .MuiDataGrid-root': { border: 'none' },
  '& .MuiDataGrid-cell': { borderBottom: 'none' },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: theme.palette.background.alt,
    color: theme.palette.secondary[100],
    borderBottom: 'none',
  },
  '& .MuiDataGrid-virtualScroller': {
    backgroundColor: theme.palette.primary.light,
  },
  '& .MuiDataGrid-footerContainer': {
    backgroundColor: theme.palette.background.alt,
    color: theme.palette.secondary[100],
    borderTop: 'none',
  },
  '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
    color: `${theme.palette.secondary[200]} !important`,
  },
});
