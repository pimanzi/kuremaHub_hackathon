import Search from './pages/Search';
import Home from './pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ArtShow from './pages/ArtShow';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ArtistProfile from './pages/ArtistProfile';
import ProtectedRoute from './components/ProtectedRoute';
import AccountProfile from './pages/AccountProfile';
import Login from './pages/Login';
import Register from './pages/Register';
import ArtUpload from './pages/ArtUpload';

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
          <Route element={<Home></Home>} path="home"></Route>
          <Route element={<ArtShow></ArtShow>} path="art/:id"></Route>
          <Route
            element={<ArtistProfile></ArtistProfile>}
            path="artist/:id"
          ></Route>
          <Route
            element={
              <ProtectedRoute>
                {' '}
                <AccountProfile></AccountProfile>{' '}
              </ProtectedRoute>
            }
            path="account"
          ></Route>

          <Route
            element={
              <ProtectedRoute>
                {' '}
                <ArtUpload></ArtUpload>{' '}
              </ProtectedRoute>
            }
            path="profile/createArt"
          ></Route>
          <Route path="login" element={<Login></Login>}>
            {' '}
          </Route>
          <Route path="register" element={<Register></Register>}>
            {' '}
          </Route>
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
