import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router';
import {ApplicationContextProvider} from '../contexts/ApplicationContext.tsx'
import App from './App.tsx';
import '@mantine/core/styles.css';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
    <BrowserRouter>
    <ApplicationContextProvider>
      <App />
    </ApplicationContextProvider>
    </BrowserRouter>
    </MantineProvider>
  </StrictMode>,
)
