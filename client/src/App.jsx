/** @format */

import './index.css';
import app_routes from './app_routes';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SocketProvider } from './context/SocketContext';
import { useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { AuthProvider } from './context/AuthContext';

function App() {
  const routing = useRoutes(app_routes);

  return (
    <Provider store={store}>
      <AuthProvider>
        <SocketProvider>{routing}</SocketProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
