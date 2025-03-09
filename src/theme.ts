'use client';
import { createTheme } from '@mui/material/styles';
import { linkBehaviorConfiguration } from './config/linkBehavior';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-geist-sans)',
  },
  palette: {
    primary: {
      main: '#6a8e21',
    }
  },
  ...linkBehaviorConfiguration,
});

export default theme;
