import Image from 'next/image';
import AddNewBtn from './AddNewBtn';
import TaskCard from './TaskCard';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  status: string;
  handleAddTask: (status: string) => void;
}

interface Task {
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
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center mb-2">
        <p className="text-lg">{title}</p>
        <div>
          {' '}
          <Image src={'/list.png'} alt="list" width={20} height={20} />
        </div>
      </div>
      {tasks?.map((task, index) => (
        <TaskCard
          key={index}
          title={task.title}
          description={task.description}
          status={task.status}
          priority={task.priority}
          deadline={task.deadline}
        />
      ))}
      <AddNewBtn status={status} handleAddTask={handleAddTask} />
    </div>
  );
};
export default TaskColumn;
