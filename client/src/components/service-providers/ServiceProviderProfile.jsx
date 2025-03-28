import React from 'react';
import { useSelector } from 'react-redux';

const ServiceProviderProfile = ({ user }) => {
  // Use provided user or fall back to Redux store
  const userFromState = useSelector((state) => state.auth.user);
  const providerData = user ||
    userFromState || {
      // Mock data
      username: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+92 300 1234567',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      serviceCategory: 'Plumbing',
      experience: '5 years',
      rating: 4.8,
      bio: 'Professional plumber with expertise in residential and commercial services. Specialized in leak detection and repair.',
      availabilityStatus: 'available',
      completedJobs: 132,
      locationCity: 'Lahore',
      locationArea: 'Model Town',
    };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-600 h-24 w-full relative">
        <div className="absolute -bottom-12 left-6">
          <div className="h-24 w-24 rounded-full border-4 border-white overflow-hidden bg-white">
            <img
              src={
                providerData.avatar ||
                'https://randomuser.me/api/portraits/men/32.jpg'
              }
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="pt-14 px-6 pb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">{providerData.username}</h2>
            <p className="text-gray-600">
              {providerData.serviceCategory} Specialist
            </p>
          </div>
          <div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                providerData.availabilityStatus === 'available'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {providerData.availabilityStatus === 'available'
                ? 'Available'
                : 'Unavailable'}
            </span>
          </div>
        </div>

        <div className="flex items-center mt-3">
          <div className="flex items-center">
            <svg
              className="h-4 w-4 text-yellow-400 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <span className="ml-1 text-gray-700">{providerData.rating}/5</span>
          </div>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-gray-600">
            {providerData.completedJobs} jobs completed
          </span>
        </div>

        <div className="mt-5">
          <h3 className="font-medium">About</h3>
          <p className="text-gray-600 text-sm mt-1">{providerData.bio}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-5">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Experience</h3>
            <p className="mt-1">{providerData.experience}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Location</h3>
            <p className="mt-1">
              {providerData.locationArea}, {providerData.locationCity}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Email</h3>
            <p className="mt-1 truncate">{providerData.email}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Phone</h3>
            <p className="mt-1">{providerData.phone}</p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t">
          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderProfile;
