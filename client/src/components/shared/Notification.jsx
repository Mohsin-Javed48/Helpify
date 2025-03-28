import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import ServiceProviderIcon from '../../../public/ServiceProviderIcon.png';
import { useSocket } from '../../context/SocketContext';

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const { socket, connected } = useSocket();

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (!socket || !connected) {
      console.log('Socket not connected, skipping socket event setup');
      return;
    }

    console.log('Setting up socket event listeners');

    // Listen for real-time notifications
    const handleServiceRequest = (data) => {
      addNewNotification({
        type: 'SERVICE_REQUEST',
        message: data.message,
        data: data,
        createdAt: new Date(),
      });
    };

    const handleNewBid = (data) => {
      addNewNotification({
        type: 'NEW_BID',
        message: `New bid received for $${data.bidAmount}`,
        data: data,
        createdAt: new Date(),
      });
    };

    const handleCounterOffer = (data) => {
      addNewNotification({
        type: 'COUNTER_OFFER',
        message: `Counter offer received for $${data.counterOfferAmount}`,
        data: data,
        createdAt: new Date(),
      });
    };

    const handleBidAccepted = (data) => {
      addNewNotification({
        type: 'BID_ACCEPTED',
        message: `Your bid has been accepted for $${data.finalAmount}`,
        data: data,
        createdAt: new Date(),
      });
    };

    // Add event listeners
    socket.on('new-service-request', handleServiceRequest);
    socket.on('new-bid-received', handleNewBid);
    socket.on('counter-offer-received', handleCounterOffer);
    socket.on('bid-accepted', handleBidAccepted);

    // Cleanup function
    return () => {
      if (socket && connected) {
        socket.off('new-service-request', handleServiceRequest);
        socket.off('new-bid-received', handleNewBid);
        socket.off('counter-offer-received', handleCounterOffer);
        socket.off('bid-accepted', handleBidAccepted);
      }
    };
  }, [socket, connected]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('/api/notifications');
      setNotifications(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast.error('Failed to load notifications');
      setLoading(false);
      setNotifications([]);
    }
  };

  const addNewNotification = (notification) => {
    setNotifications((prev) => [notification, ...prev]);
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const getNotificationDetails = (notification) => {
    switch (notification.type) {
      case 'SERVICE_REQUEST':
        return {
          title: 'New Service Request',
          items:
            notification.data.services?.map((s) => s.name).join(', ') ||
            'Service request',
          location: notification.data.address || 'Location not specified',
        };
      case 'NEW_BID':
        return {
          title: 'New Bid Received',
          items: `Bid amount: $${notification.data.bidAmount}`,
          location: notification.data.message || '',
        };
      case 'COUNTER_OFFER':
        return {
          title: 'Counter Offer',
          items: `Counter offer amount: $${notification.data.counterOfferAmount}`,
          location: notification.data.message || '',
        };
      case 'BID_ACCEPTED':
        return {
          title: 'Bid Accepted',
          items: `Final amount: $${notification.data.finalAmount}`,
          location: 'Your bid has been accepted',
        };
      default:
        return {
          title: notification.type,
          items: notification.message,
          location: '',
        };
    }
  };

  return (
    <>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px]"
        style={{ fontFamily: 'Barlow, sans-serif' }}
      >
        <div className="col-start-1 col-end-2">
          <h1 className="text-[#464255] text-[22px] sm:text-[25px] md:text-[28px] lg:text-[32px] font-semibold leading-normal">
            Notification
          </h1>
          <h2 className="text-[#A3A3A3] text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-medium leading-normal">
            Hi, {user?.firstName || 'User'}. Welcome back to Helpify!
          </h2>
        </div>

        <div className="col-span-1 md:col-end-3 lg:col-end-5 flex justify-center gap-[8px] items-center p-3 bg-[#fff]">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 34 34"
              fill="none"
              className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px] md:w-[30px] md:h-[30px] lg:w-[34px] lg:h-[34px]"
            >
              <path
                d="M8.5 29.7502H25.5C26.6272 29.7502 27.7082 29.3024 28.5052 28.5054C29.3022 27.7083 29.75 26.6273 29.75 25.5002V8.50016C29.75 7.37299 29.3022 6.29199 28.5052 5.49496C27.7082 4.69793 26.6272 4.25016 25.5 4.25016H24.0833C24.0833 3.87444 23.9341 3.5141 23.6684 3.24843C23.4027 2.98275 23.0424 2.8335 22.6667 2.8335C22.2909 2.8335 21.9306 2.98275 21.6649 3.24843C21.3993 3.5141 21.25 3.87444 21.25 4.25016H12.75C12.75 3.87444 12.6007 3.5141 12.3351 3.24843C12.0694 2.98275 11.7091 2.8335 11.3333 2.8335C10.9576 2.8335 10.5973 2.98275 10.3316 3.24843C10.0659 3.5141 9.91667 3.87444 9.91667 4.25016H8.5C7.37283 4.25016 6.29183 4.69793 5.4948 5.49496C4.69777 6.29199 4.25 7.37299 4.25 8.50016V25.5002C4.25 26.6273 4.69777 27.7083 5.4948 28.5054C6.29183 29.3024 7.37283 29.7502 8.5 29.7502ZM7.08333 8.50016C7.08333 8.12444 7.23259 7.76411 7.49827 7.49843C7.76394 7.23275 8.12428 7.0835 8.5 7.0835H9.91667V8.50016C9.91667 8.87589 10.0659 9.23622 10.3316 9.5019C10.5973 9.76757 10.9576 9.91683 11.3333 9.91683C11.7091 9.91683 12.0694 9.76757 12.3351 9.5019C12.6007 9.23622 12.75 8.87589 12.75 8.50016V7.0835H21.25V8.50016C21.25 8.87589 21.3993 9.23622 21.6649 9.5019C21.9306 9.76757 22.2909 9.91683 22.6667 9.91683C23.0424 9.91683 23.4027 9.76757 23.6684 9.5019C23.9341 9.23622 24.0833 8.87589 24.0833 8.50016V7.0835H25.5C25.8757 7.0835 26.2361 7.23275 26.5017 7.49843C26.7674 7.76411 26.9167 8.12444 26.9167 8.50016V12.7502H7.08333V8.50016ZM7.08333 15.5835H26.9167V25.5002C26.9167 25.8759 26.7674 26.2362 26.5017 26.5019C26.2361 26.7676 25.8757 26.9168 25.5 26.9168H8.5C8.12428 26.9168 7.76394 26.7676 7.49827 26.5019C7.23259 26.2362 7.08333 25.8759 7.08333 25.5002V15.5835Z"
                fill="#2D9CDB"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-[#464255] text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-medium leading-normal">
              Filter Periode
            </h1>
            <h2 className="text-[#464255] text-[6px] sm:text-[8px] md:text-[10px] lg:text-[12px] font-normal leading-[18px]">
              17 April 2020 - 21 May 2020
            </h2>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px] lg:w-[24px] lg:h-[24px]"
            >
              <path
                d="M11.9887 16.4717C11.7576 16.4697 11.5364 16.378 11.3717 16.216L2.6444 7.48875C2.48542 7.32415 2.39746 7.1037 2.39945 6.87487C2.40144 6.64605 2.49322 6.42716 2.65503 6.26535C2.81684 6.10353 3.03573 6.01175 3.26456 6.00976C3.49338 6.00777 3.71384 6.09574 3.87844 6.25471L11.9887 14.365L20.0989 6.25471C20.1795 6.17136 20.2758 6.10487 20.3822 6.05914C20.4887 6.0134 20.6032 5.98932 20.7191 5.98831C20.835 5.98731 20.9499 6.00939 21.0572 6.05327C21.1644 6.09715 21.2619 6.16195 21.3438 6.2439C21.4257 6.32584 21.4905 6.42328 21.5344 6.53054C21.5783 6.63779 21.6004 6.75271 21.5994 6.86859C21.5984 6.98447 21.5743 7.09899 21.5286 7.20547C21.4828 7.31194 21.4163 7.40824 21.333 7.48875L12.6057 16.216C12.441 16.378 12.2197 16.4697 11.9887 16.4717Z"
                fill="#B9BBBD"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[#fff] p-1 sm:p-6 md:p-8 lg:p-10 space-y-4">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 mb-4 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              No notifications
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              You're all caught up! New notifications will appear here.
            </p>
          </div>
        ) : (
          notifications.map((notification) => {
            const details = getNotificationDetails(notification);
            return (
              <div
                key={notification.id}
                className="rounded-mds p-4 flex justify-between"
                style={{
                  background:
                    'linear-gradient(90deg, #FEF1EC 0%, #AFE1F9 100%)',
                }}
              >
                <div className="flex items-center gap-10">
                  <img
                    src={ServiceProviderIcon}
                    alt="Service Provider"
                    className="hidden sm:block w-[34px] h-[34px] sm:w-[44px] sm:h-[44px] md:w-[54px] md:h-[54px] lg:w-[64px] lg:h-[64px]"
                  />
                  <div className="text-[6px] sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px] font-medium">
                    <h2 className="font-poppins text-[18px] sm:text-[22px] md:text-[28px] lg:text-[34px] leading-normal font-bold">
                      {details.title}
                    </h2>
                    <h2 className="font-poppins text-[#E23744] text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] leading-normal">
                      Timing: {formatTimeAgo(notification.createdAt)}
                    </h2>
                    <h2 className="font-poppins text-[#6A6A6A] text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] leading-normal font-medium">
                      Items: {details.items}
                    </h2>
                    {details.location && (
                      <h2 className="font-poppins text-[#6A6A6A] text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] leading-normal font-medium">
                        Location: {details.location}
                      </h2>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default Notification;
