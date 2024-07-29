import React from 'react';
import formatDate from '../lib/functions/formatDate';
import Image from 'next/image';

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
  } else if (priority === 'medium') {
    priorityColor = '#ffa235';
  } else {
    priorityColor = '#10cc5a';
  }
  return (
    <div className="bg-[#f9f9f9] rounded-lg p-2">
      <p className="text-[#6a6a6a] font-semibold">{title}</p>
      <p className="text-[#797979] my-2 text-sm">{description}</p>
      <button
        style={{ backgroundColor: priorityColor }}
        className="rounded-lg px-2 text-white text-sm py-1"
      >
        {priority}
      </button>
      <div className="text-[#6a6a6a] my-2 font-semibold flex gap-2">
        {' '}
        <div className="flex items-center">
          {' '}
          <Image src={'/clock.png'} alt="clock" width={20} height={20} />
        </div>
        {formatDate(deadline)}
      </div>
      <p className="text-[#797979] text-sm">1 hr ago</p>
    </div>
  );
};

export default TaskCard;
