'use client';
import AddTaskForm from '@/components/AddTaskForm';
import Navbar from '@/components/Navbar';
import TaskColumn from '@/components/TaskColumn';
import { Modal } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import getCookie from '@/lib/functions/getCookie';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchData,
  addTask,
  updateTaskStatus,
  clearUser,
} from '@/redux/slices/appSlice';
import { AppDispatch, RootState } from '@/redux/store';
import ButtonsSection from '@/components/ButtonsSection';
import NotesSection from '@/components/NotesSection';

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'to-do' | 'in-progress' | 'under-review' | 'finished';
  priority?: 'urgent' | 'medium' | 'low';
  deadline?: Date;
}

export default function Home() {
  const [openForm, setOpenForm] = useState(false);
  const [columnStatus, setColumnStatus] = useState('');

  const router = useRouter();
  let userId: string | null = null;

  const token = getCookie('token'); //jwt token

  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.app.tasks);
  // const taskStatus = useSelector((state: RootState) => state.app.status);
  const user = useSelector((state: RootState) => state.app.user);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      userId = localStorage.getItem('__uid');
      if (!userId) {
        router.push('/register');
      } else {
        dispatch(fetchData(userId));
      }
    }
  }, [dispatch, userId]);

  const addNewTask = async (newTask: object) => {
    try {
      const res = await fetch('/api/task/create-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTask),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.task) {
            dispatch(addTask(data.task)); //redux
            setOpenForm(false);

            toast.success('Task created successfully');
          } else {
            toast.error('Error creating task');
          }
        });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateTask = async (taskId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/task/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          taskId,
          newStatus,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.task) {
            console.log('Task status updated successfully');
          } else {
            console.error('Error updating task status:', data.error);
          }
        });
    } catch (err) {
      console.log(err);
      toast.error('Error updating status');
    }
  };

  // dragging
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // outside droppable/ the same position
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const draggedTask = tasks.find((task) => task._id === draggableId);
    if (!draggedTask) return;

    const updatedTasks = tasks.map((task) =>
      task._id === draggableId
        ? { ...task, status: destination.droppableId as Task['status'] }
        : task
    );

    const tasksInColumn = updatedTasks.filter(
      (task) => task.status === destination.droppableId
    );

    // Removing dragged task
    const [movedTask] = tasksInColumn.splice(source.index, 1);

    tasksInColumn.splice(destination.index, 0, movedTask);

    const finalTasks = updatedTasks.map((task) =>
      task.status === destination.droppableId
        ? tasksInColumn.find((t) => t?._id === task?._id) || task
        : task
    );

    const updatedTask = {
      ...draggedTask,
      status: destination.droppableId,
    };

    updateTask(updatedTask._id, updatedTask.status); //upadting in backend
    dispatch(updateTaskStatus(finalTasks));
  };

  const openTaskForm = (status: string) => {
    setColumnStatus(status);
    setOpenForm(true);
  };

  const logout = () => {
    dispatch(clearUser());
    localStorage.removeItem('__uid');
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    router.push('/login');
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex text-[#555555]">
        <Navbar
          logout={logout}
          openTaskForm={() => setOpenForm(true)}
          username={user?.username}
        />{' '}
        <div className="bg-[#f7f7f7] px-4 py-8">
          <div className="flex items-center justify-between gap-2">
            <p className="md:text-3xl text-xl text-black font-semibold">
              Good Morning, {user?.username}!
            </p>
            {/* desktop */}
            <div className="md:flex hidden items-center gap-2">
              <p className="">Help & feedback</p>
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
            {/* mobile */}
            <button
              onClick={logout}
              className="p-2 md:hidden inline-block text-sm cursor-pointer bg-[#f4f4f4] rounded"
            >
              Logout
            </button>
          </div>
          <NotesSection />
          <ButtonsSection openForm={() => setOpenForm(true)} />
          <div className="tasks_div bg-[#ffffff] min-h-[30rem] rounded-lg grid md:grid-cols-4 grid-cols-1 gap-2 p-2">
            {['to-do', 'in-progress', 'under-review', 'finished'].map(
              (status, index) => (
                <TaskColumn
                  key={index}
                  handleAddTask={openTaskForm}
                  title={
                    status.charAt(0).toUpperCase() +
                    status.replace('-', ' ').slice(1)
                  }
                  tasks={
                    tasks && tasks[0]?.title === 'fetching' //for skeleton presentation while fetching
                      ? tasks
                      : tasks?.filter((task) => task.status === status)
                  }
                  status={status}
                />
              )
            )}
          </div>{' '}
          <Modal
            centered
            title={[]}
            open={openForm}
            onCancel={() => {
              setOpenForm(false);
              setColumnStatus('');
            }}
            footer={[]}
          >
            <AddTaskForm addTask={addNewTask} columnStatus={columnStatus} />
          </Modal>
        </div>
      </div>
    </DragDropContext>
  );
}
