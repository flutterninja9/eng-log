import React from 'react';
import { useQuery } from 'react-query';
import { format } from 'date-fns';
import { Search, Filter } from 'lucide-react';
import { fetchEntries } from '../api/entries';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { data: entries, isLoading, error } = useQuery('entries', fetchEntries);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="mb-6 flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search entries..."
            className="pl-10 pr-4 py-2 border rounded-lg"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          <Filter className="mr-2" size={20} />
          Filter
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {entries?.map((entry) => (
          <div key={entry._id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{entry.title}</h2>
            <p className="text-gray-600 mb-4">{format(new Date(entry.date), 'MMMM d, yyyy')}</p>
            <p className="text-gray-800">{entry.content.substring(0, 100)}...</p>
            <div className="mt-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full mr-2">
                {entry.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;