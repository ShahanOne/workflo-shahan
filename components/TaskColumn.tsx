import Image from 'next/image';
import AddNewBtn from './AddNewBtn';
import TaskCard from './TaskCard';
import { Droppable } from '@hello-pangea/dnd';
interface TaskColumnProps {
  title: string;
  tasks: Task[];
  status: string;
  handleAddTask: (status: string) => void;
}

interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'to-do' | 'in-progress' | 'under-review' | 'finished';
  priority: 'urgent' | 'medium' | 'low';
  deadline: Date;
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
          {tasks.map((task, index) => (
            <TaskCard key={task._id} {...task} index={index} />
          ))}
          {provided.placeholder}
          <AddNewBtn status={status} handleAddTask={handleAddTask} />
        </div>
      )}
    </Droppable>
  );
};
export default TaskColumn;
//  <div className="flex flex-col gap-3">
//       <div className="flex justify-between items-center mb-2">
//         <p className="text-lg">{title}</p>
//         <div>
//           {' '}
//           <Image src={'/list.png'} alt="list" width={20} height={20} />
//         </div>
//       </div>

//       {tasks?.map((task, index) => (
//         <TaskCard key={index} {...task} />
//       ))}
//       <AddNewBtn status={status} handleAddTask={handleAddTask} />
//     </div>
