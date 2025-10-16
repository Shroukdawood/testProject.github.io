import React from 'react';

export default function Admin() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>This is a protected admin area. Only users with the admin role can access this page.</p>
    </div>
  );
}
