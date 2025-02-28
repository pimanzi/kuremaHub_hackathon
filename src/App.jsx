// src/App.jsx
//import Home from './pages/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Trial from './pages/Trial';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ArtPage from './features/arts/ArtPage';
import ArtShow from './pages/ArtShow';

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
      <ArtShow></ArtShow>
    </QueryClientProvider>
  );
}
