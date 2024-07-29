'use client';
import AddNewBtn from '@/components/AddNewBtn';
import AddTaskForm from '@/components/AddTaskForm';
import Navbar from '@/components/Navbar';
import NoteCard from '@/components/NoteCard';
import TaskCard from '@/components/TaskCard';
import TaskColumn from '@/components/TaskColumn';
import { Modal } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
interface Task {
  title: string;
  description: string;
  status: 'to-do' | 'in-progress' | 'under-review' | 'finished';
  priority: 'urgent' | 'medium' | 'low';
  deadline: Date;
}
export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [addTask, setAddTask] = useState(false);
  const [columnStatus, setColumnStatus] = useState('');
  let userId: string | null = null;

  if (typeof window !== 'undefined') {
    userId = localStorage.getItem('__uid');
  }

  useEffect(() => {
    const getTasks = async () => {
      const res = await fetch('/api/task/get-tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      })
        .then((response) => response.json())
        .then((data) => {
          setTasks(data?.tasks);
        });
    };

    getTasks();
  }, []);

  const todoTasks = tasks?.filter((task) => task.status === 'to-do');
  const inProgressTasks = tasks?.filter(
    (task) => task.status === 'in-progress'
  );
  const underReviewTasks = tasks?.filter(
    (task) => task.status === 'under-review'
  );
  const finishedTasks = tasks?.filter((task) => task.status === 'finished');

  const addNewTask = (status: string) => {
    setColumnStatus(status);
    setAddTask(true);
  };

  return (
    <div className="flex">
      <Navbar />{' '}
      <div className="bg-[#f7f7f7] px-4 py-12">
        <div className="flex justify-between">
          <p className="text-3xl">Good Morning, {'username'}!</p>
          <div className="flex items-center gap-2">
            <p>Help & feedback</p>
            <div>
              {' '}
              <Image
                src={'/question.png'}
                alt="question"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <NoteCard
            title={'Introducing tags'}
            content={
              'Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.'
            }
            icon={'/1.png'}
          />
          <NoteCard
            title={'Share Notes Instantly'}
            content={
              'Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.'
            }
            icon={'/2.png'}
          />
          <NoteCard
            title={'Access Anywhere'}
            content={
              "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer."
            }
            icon={'/3.png'}
          />
        </div>
        <div className="tasks_div bg-[#ffffff] min-h-[30rem] rounded grid grid-cols-4 gap-2 p-2">
          <TaskColumn
            handleAddTask={addNewTask}
            title="To do"
            tasks={todoTasks}
            status="to-do"
          />
          <TaskColumn
            handleAddTask={addNewTask}
            title="In Progress"
            tasks={inProgressTasks}
            status="in-progress"
          />
          <TaskColumn
            handleAddTask={addNewTask}
            title="Under Review"
            tasks={underReviewTasks}
            status="under-review"
          />
          <TaskColumn
            handleAddTask={addNewTask}
            title="Finished"
            tasks={finishedTasks}
            status="finished"
          />
        </div>
        <Modal
          centered
          title={[]}
          open={addTask}
          onCancel={() => {
            setAddTask(false);
            setColumnStatus('');
          }}
          footer={[]}
        >
          <AddTaskForm
            closeForm={() => setAddTask(false)}
            columnStatus={columnStatus}
          />
        </Modal>
      </div>
    </div>
  );
}
