import React from 'react';

function TrendingTopics({ topics }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-xl font-bold mb-2">Tendencias</h3>
      <ul className="space-y-2">
        {topics.map((topic, index) => (
          <li key={index}>
            <a href="#" className="text-blue-500 hover:text-blue-600">
              {topic}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrendingTopics;