import Image from 'next/image';
import AddNewBtn from './AddNewBtn';
import TaskCard from './TaskCard';
import { Droppable } from '@hello-pangea/dnd';
import SkeletonCard from './SkeletonCard';
interface TaskColumnProps {
  title: string;
  tasks: Task[];
  status: string;
  handleAddTask: (status: string) => void;
}

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'to-do' | 'in-progress' | 'under-review' | 'finished';
  priority?: 'urgent' | 'medium' | 'low';
  deadline?: Date;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  tasks,
  handleAddTask,
  status,
}) => {
  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="flex flex-col gap-3 p-2 bg-white rounded-lg"
        >
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg">{title}</p>
          </div>

          {tasks[0]?.title === 'fetching' ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : tasks.length > 0 ? (
            tasks.map((task, index) => (
              <TaskCard key={task._id} {...task} index={index} />
            ))
          ) : (
            <p className="text-sm italic">no tasks available</p>
          )}

          {provided.placeholder}
          <AddNewBtn status={status} handleAddTask={handleAddTask} />
        </div>
      )}
    </Droppable>
  );
};
export default TaskColumn;
