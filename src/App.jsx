<<<<<<< HEAD
import Home from './pages/Home'

export default function App() {
  return <Home/>;
=======
import Home from './pages/Home';
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
      <Home></Home>
    </QueryClientProvider>
  );
>>>>>>> de42a33c0a2d0b41b4c21c19b5233bab22f6c3f6
}
