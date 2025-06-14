import React from 'react';

type ActivityRowProps = {
  date: string;
  activity: string;
  details: string;
};

const ActivityRow: React.FC<ActivityRowProps> = ({ date, activity, details }) => {
  return (
    <tr className="border-t border-gray-200 rounded-xl">
      <td className="px-6 py-4 text-white">{date}</td>
      <td className="px-6 py-4 text-white font-medium">{activity}</td>
      <td className="px-6 py-4 text-white">{details}</td>
    </tr>
  );
};

export default ActivityRow;
