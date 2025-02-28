// src/App.jsx
// import Home from './pages/Home';
import Trial from './pages/Trial'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Trial />
    </QueryClientProvider>
  );
}