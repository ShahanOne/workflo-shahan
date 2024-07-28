import AddNewBtn from './AddNewBtn';
import TaskCard from './TaskCard';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
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
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <p>{title}</p>
        <i></i>
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
      <AddNewBtn
        status={tasks && tasks[0]?.status}
        handleAddTask={handleAddTask}
      />
    </div>
  );
};
export default TaskColumn;
