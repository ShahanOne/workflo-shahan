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
    <div className="bg-[#f9f9f9] border-[#bab9b9] border-[0.5px] rounded-lg px-2 py-3">
      <p className="text-[#6a6a6a] font-semibold">{title}</p>
      <p className="text-[#797979] my-3 text-sm">{description}</p>
      <button
        style={{ backgroundColor: priorityColor }}
        className="rounded-lg px-2 text-white text-sm py-1"
      >
        {priority}
      </button>
      <div className="text-[#6a6a6a] text-sm my-3 font-semibold flex gap-2">
        {' '}
        <div className="flex items-center">
          {' '}
          <Image src={'/clock.png'} alt="clock" width={20} height={20} />
        </div>
        {formatDate(deadline)}
      </div>
      <p className="text-[#797979] text-sm">just now</p>
    </div>
  );
};

export default TaskCard;
