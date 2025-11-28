import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router';
import ApplicationContext from '../contexts/ApplicationContext.tsx'
import App from './App.tsx';
import '@mantine/core/styles.css';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
    <BrowserRouter>
    <ApplicationContext>
      <App />
    </ApplicationContext>
    </BrowserRouter>
    </MantineProvider>
  </StrictMode>,
)
