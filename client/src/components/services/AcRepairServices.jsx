/** @format */

import { useState, useEffect } from 'react';
import getServicesByCategory from '../../api/service';
import ServicesCard from './ServicesCard';

function AcRepairServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const name = 'ac_repair';

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServicesByCategory(name);
        console.log('AC Repair Services:', data);
        setServices(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching AC repair services:', err);
        setError('Failed to load AC repair services');
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <div>Loading AC repair services...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <ServicesCard services={services} name={name} category={name} />
    </div>
  );
}

export default AcRepairServices;
