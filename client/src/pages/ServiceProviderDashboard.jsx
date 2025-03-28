import { useState } from 'react';
import { useSelector } from 'react-redux';
import ServiceProviderNavbar from '../components/service-providers/ServiceProviderNavbar';
import ServiceProviderProfile from '../components/service-providers/ServiceProviderProfile';
import ServiceProviderOrders from '../components/service-providers/ServiceProviderOrders';
import ServiceProviderServices from '../components/service-providers/ServiceProviderServices';
import ServiceProviderBidding from '../components/service-providers/ServiceProviderBidding';
import ServiceProviderReviews from '../components/service-providers/ServiceProviderReviews';
import ServiceProviderStatistics from '../components/service-providers/ServiceProviderStatistics';

const ServiceProviderDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const user = useSelector((state) => state.auth.user);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <ServiceProviderStatistics />
            </div>
            <div className="md:col-span-1">
              <ServiceProviderProfile user={user} />
            </div>
            <div className="md:col-span-3">
              <h2 className="text-2xl font-bold mb-4">Active Bids</h2>
              <ServiceProviderBidding />
            </div>
          </div>
        );
      case 'orders':
        return <ServiceProviderOrders />;
      case 'services':
        return <ServiceProviderServices />;
      case 'bids':
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Manage Bids & Offers</h2>
            <ServiceProviderBidding />
          </>
        );
      case 'reviews':
        return <ServiceProviderReviews />;
      case 'profile':
        return <ServiceProviderProfile user={user} />;
      default:
        return <ServiceProviderStatistics />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ServiceProviderNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="container mx-auto px-4 py-6">{renderTabContent()}</div>
    </div>
  );
};

export default ServiceProviderDashboard;
