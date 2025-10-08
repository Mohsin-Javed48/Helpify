/** @format */

import './index.css';
import { useRoutes } from 'react-router';
import app_routes from './app_routes';
import { AnimatePresence } from 'framer-motion';
import AnimatedRoute from './components/Layout/AnimateRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  const queryClient = new QueryClient();
  const routing = useRoutes(app_routes);

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode="wait">
        <AnimatedRoute>{routing}</AnimatedRoute>
      </AnimatePresence>
    </QueryClientProvider>
  );
}

export default App;
