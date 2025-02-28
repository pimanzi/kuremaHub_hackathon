// src/App.jsx
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Trial from './pages/Trial';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ArtPage from './features/arts/ArtPage';
import ArtShow from './pages/ArtShow';
import { Toaster } from 'react-hot-toast';

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
      <BrowserRouter>
        <Routes>
          <Route index element={<Home></Home>}></Route>
          <Route element={<Search></Search>} path="catalogue"></Route>
          <Route element={<ArtShow></ArtShow>} path="art/:id"></Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '700px',
            padding: '16px 24px',
            backgroundColor: '#fff',
            color: '#000',
          },
        }}
      />
    </QueryClientProvider>
  );
}
