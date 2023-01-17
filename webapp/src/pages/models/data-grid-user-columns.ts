import { getRoleString } from '@local/pages/utils/user-role';

export const userColumns = [
  // property 'flex' says how we want each column to grow, shrink and how much space it can take up
  { field: '_id', headerName: 'ID', flex: 1 },
  { field: 'firstName', headerName: 'Name', flex: 0.5 },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
  },
  {
    field: 'phoneNumber',
    headerName: 'Phone Number',
    flex: 0.5,
    // customization of rendering of the cell
    renderCell: (parameters: any) =>
      parameters.value.replace(/^(\d{3})(\d{3})(\d{4})/, '($1)$2-$3'),
  },
  { field: 'country', headerName: 'Country', flex: 0.4 },
  {
    field: 'occupation',
    headerName: 'Occupation',
    flex: 1,
  },
  {
    field: 'role',
    headerName: 'Role',
    flex: 0.5,
    renderCell: (parameters: any) => getRoleString(parameters.value),
  },
];
