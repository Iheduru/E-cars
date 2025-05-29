import React from 'react';
import { useParams } from 'react-router-dom';

const CarDetails = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Car Details</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-gray-600">Loading details for car ID: {id}...</p>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;