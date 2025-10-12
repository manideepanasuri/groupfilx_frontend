
import { createRoot } from 'react-dom/client'
import './index.css'
import './index.css'
import App from './App.tsx'
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {BrowserRouter} from "react-router-dom";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/queries/query-task.ts";
import {HelmetProvider} from "react-helmet-async";

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
  <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </QueryClientProvider>
  </ThemeProvider>
  </HelmetProvider>,
)
