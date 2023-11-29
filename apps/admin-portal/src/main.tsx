import {StrictMode} from 'react';
import * as ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import {ChakraProvider} from "@chakra-ui/react";
import theme from "./theme/theme";
import App from "./app/app";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ChakraProvider theme={theme}>
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App/>
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>
  </ChakraProvider>
);
