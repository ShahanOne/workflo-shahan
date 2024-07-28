'use client';
import AddNewBtn from '@/components/AddNewBtn';
import AddTaskForm from '@/components/AddTaskForm';
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
  const [columnStatus, setColumnStatus] = useState('to-do');

  useEffect(() => {
    const getTasks = async () => {
      const res = await fetch('/api/task/get-tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            userId: 'userId',
          },
        ]),
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
    <div className="bg-[#f7f7f7] px-4 py-12">
      <div className="flex justify-between">
        <p className="text-3xl">Good Morning, {'username'}!</p>
        <div className="flex">
          <p>Help & feedback</p>
          <i></i>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <NoteCard
          title={'Introducing tags'}
          content={
            'Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.'
          }
          icon={''}
        />
        <NoteCard
          title={'Share Notes Instantly'}
          content={
            'Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.'
          }
          icon={''}
        />
        <NoteCard
          title={'Access Anywhere'}
          content={
            "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer."
          }
          icon={''}
        />
      </div>
      <div className="tasks_div rounded grid grid-cols-4 gap-2 p-2">
        <TaskColumn
          handleAddTask={addNewTask}
          title="To do"
          tasks={todoTasks}
        />
        <TaskColumn
          handleAddTask={addNewTask}
          title="In Progress"
          tasks={inProgressTasks}
        />
        <TaskColumn
          handleAddTask={addNewTask}
          title="Under Review"
          tasks={underReviewTasks}
        />
        <TaskColumn
          handleAddTask={addNewTask}
          title="Finished"
          tasks={finishedTasks}
        />
      </div>
      <Modal
        centered
        title={[
          <div style={{ textAlign: 'center', fontWeight: '400' }}>
            Add Task
          </div>,
        ]}
        open={addTask}
        onCancel={() => {
          setAddTask(false);
        }}
        footer={[]}
      >
        <AddTaskForm columnStatus={columnStatus} />
      </Modal>
    </div>
  );
}
