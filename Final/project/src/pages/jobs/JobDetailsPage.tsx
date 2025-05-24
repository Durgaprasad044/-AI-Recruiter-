import React from 'react';
import { useParams } from 'react-router-dom';

const JobDetailsPage = () => {
  const { id } = useParams();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Job Details</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p>Details for job ID: {id}</p>
      </div>
    </div>
  );
};

export default JobDetailsPage;