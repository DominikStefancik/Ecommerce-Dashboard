import { useTheme } from '@mui/material';
import { CustomTheme } from '@local/pages/theme/theme';

export function useCustomTheme(): CustomTheme {
  const theme = useTheme();

  return theme as unknown as CustomTheme;
}
