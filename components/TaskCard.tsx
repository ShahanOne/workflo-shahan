import React from 'react';
import formatDate from '../lib/functions/formatDate';
import Image from 'next/image';
import { Draggable } from '@hello-pangea/dnd';
interface TaskCardProps {
  _id: string;
  title: string;
  status: string;
  priority?: 'urgent' | 'medium' | 'low';
  deadline?: Date;
  description?: string;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({
  _id,
  title,
  priority,
  deadline,
  description,
  index,
}) => {
  let priorityColor: string;

  if (priority === 'urgent') {
    priorityColor = '#ff6b6b';
  } else if (priority === 'medium') {
    priorityColor = '#ffa235';
  } else {
    priorityColor = '#10cc5a';
  }
  return (
    <Draggable draggableId={_id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-[#f9f9f9] border-[#bab9b9] border-[0.5px] rounded-lg px-2 py-3"
        >
          <p className="text-[#6a6a6a] font-semibold">{title}</p>
          <p className="text-[#797979] my-3 text-sm">{description}</p>
          <button
            style={{ backgroundColor: priorityColor }}
            className="rounded-lg px-2 text-white text-sm py-1"
          >
            {priority}
          </button>
          <div className="text-[#6a6a6a] text-sm my-3 font-semibold flex gap-2">
            <div className="flex items-center">
              <Image src={'/clock.png'} alt="clock" width={20} height={20} />
            </div>
            {deadline ? (
              formatDate(deadline)
            ) : (
              <i className="font-normal">no deadline</i>
            )}
          </div>
          <p className="text-[#797979] text-sm">just now</p>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
