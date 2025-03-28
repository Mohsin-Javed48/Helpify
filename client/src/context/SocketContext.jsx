import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const { isAuthenticated, token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    let socketInstance = null;

    const initializeSocket = () => {
      // Only connect if user is authenticated
      if (!isAuthenticated || !token) {
        if (socket) {
          socket.disconnect();
          setSocket(null);
          setConnected(false);
        }
        return;
      }

      // Initialize socket connection
      try {
        console.log('Initializing socket connection...');
        socketInstance = io('http://localhost:3000', {
          auth: {
            token,
          },
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          transports: ['websocket', 'polling'],
        });

        // Set up event listeners
        socketInstance.on('connect', () => {
          console.log('Socket connected successfully');
          setConnected(true);
        });

        socketInstance.on('disconnect', (reason) => {
          console.log('Socket disconnected:', reason);
          setConnected(false);
        });

        socketInstance.on('connect_error', (error) => {
          console.error('Socket connection error:', error.message);
          setConnected(false);
          // Try to reconnect after a delay
          setTimeout(() => {
            if (socketInstance) {
              console.log('Attempting to reconnect...');
              socketInstance.connect();
            }
          }, 5000);
        });

        // Set the socket instance in state
        setSocket(socketInstance);
      } catch (error) {
        console.error('Error initializing socket:', error);
        setConnected(false);
      }
    };

    initializeSocket();

    // Clean up on unmount
    return () => {
      if (socketInstance) {
        console.log('Cleaning up socket connection');
        socketInstance.disconnect();
        socketInstance = null;
        setSocket(null);
        setConnected(false);
      }
    };
  }, [isAuthenticated, token]);

  // Reconnect if auth state changes
  useEffect(() => {
    if (socket && token) {
      socket.auth = { token };
      if (!socket.connected) {
        try {
          console.log('Reconnecting socket due to auth state change');
          socket.connect();
        } catch (error) {
          console.error('Error reconnecting socket:', error);
          setConnected(false);
        }
      }
    }
  }, [socket, token]);

  const value = {
    socket,
    connected,
    user,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketContext;
