import React from 'react'
import ReactDOM from 'react-dom/client'
import {QueryClient, QueryClientProvider} from "react-query";
import {Auth0ProviderWithNavigate} from "./util/auth/Auth0ProviderWithNavigate";
import {BrowserRouter} from "react-router-dom";
import App from "./App";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Auth0ProviderWithNavigate>
          <App/>
        </Auth0ProviderWithNavigate>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
