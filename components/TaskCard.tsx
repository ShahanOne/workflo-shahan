import React from 'react';
import formatDate from '../lib/functions/formatDate';

interface TaskCardProps {
  title: string;
  status: string;
  priority: 'urgent' | 'medium' | 'low';
  deadline: Date;
  description: string;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  status,
  priority,
  deadline,
  description,
}) => {
  let priorityColor;

  if (priority === 'urgent') {
    priorityColor = '#ff6b6b';
  } else if (status === 'medium') {
    priorityColor = '#ffa235';
  } else {
    priorityColor = '#10cc5a';
  }
  return (
    <div className="bg-[#f9f9f9] rounded-lg p-2">
      <p className="text-[#6a6a6a] font-bold">{title}</p>
      <p className="text-[#797979] text-sm">{description}</p>
      <button
        className={`bg-[${priorityColor}] rounded-lg px-2 text-white py-1`}
      >
        {priority}
      </button>
      <p className="text-[#6a6a6a] font-bold">{formatDate(deadline)}</p>
      <p className="text-[#797979] text-sm">1 hr ago</p>
    </div>
  );
};

export default TaskCard;
