'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-geist-sans)',
  },
  palette: {
    primary: {
      main: '#6a8e21',
    }
  }
});

export default theme;
