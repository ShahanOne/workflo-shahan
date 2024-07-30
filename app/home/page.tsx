'use client';
import AddTaskForm from '@/components/AddTaskForm';
import Navbar from '@/components/Navbar';
import NoteCard from '@/components/NoteCard';
import TaskColumn from '@/components/TaskColumn';
import { Modal } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'to-do' | 'in-progress' | 'under-review' | 'finished';
  priority: 'urgent' | 'medium' | 'low';
  deadline: Date;
}
interface User {
  username: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [user, setUser] = useState<User>();
  const [openForm, setOpenForm] = useState(false);
  const [columnStatus, setColumnStatus] = useState('');

  const router = useRouter();
  let userId: string | null = null;

  if (typeof window !== 'undefined') {
    userId = localStorage.getItem('__uid');
  }

  useEffect(() => {
    if (!userId) {
      router.push('/register');
    } else {
      router.push('/home');
    }
  }, [router, userId]);

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
          setUser(data?.user);
          setTasks(data?.tasks);
        });
    };

    getTasks();
  }, []);

  // const todoTasks = tasks?.filter((task) => task.status === 'to-do');
  // const inProgressTasks = tasks?.filter(
  //   (task) => task.status === 'in-progress'
  // );
  // const underReviewTasks = tasks?.filter(
  //   (task) => task.status === 'under-review'
  // );
  // const finishedTasks = tasks?.filter((task) => task.status === 'finished');

  const addNewTask = async (newTask: object) => {
    try {
      const res = await fetch('/api/task/create-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.task) {
            setTasks((prev) => [...prev, data.task]);
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

  const openTaskForm = (status: string) => {
    setColumnStatus(status);
    setOpenForm(true);
  };

  const logout = () => {
    localStorage.removeItem('__uid');
    router.push('/login');
  };

  const updateTask = async (taskId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/task/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
        ? tasksInColumn.find((t) => t._id === task._id) || task
        : task
    );

    const updatedTask = {
      ...draggedTask,
      status: destination.droppableId,
    };

    updateTask(updatedTask._id, updatedTask.status); //upadting in backend
    setTasks(finalTasks);
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
          <div className="flex justify-between gap-2">
            <p className="md:text-3xl text-xl text-black font-semibold">
              Good Morning, {user?.username}!
            </p>
            <div className="flex items-center gap-2">
              <p className="md:block hidden">Help & feedback</p>
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
          <div className="grid md:grid-cols-3 grid-cols-1 md:gap-2">
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
          <div className="flex md:flex-row flex-col justify-between text-sm items-center gap-4 py-4">
            <div className="flex items-center border rounded-lg bg-white px-2 py-1">
              <input
                type="text"
                placeholder="Search"
                className="border-none outline-none w-full"
              />
              <>
                <Image
                  src={'/search.png'}
                  alt="search"
                  className="cursor-pointer"
                  width={20}
                  height={20}
                />
              </>
            </div>
            <div className="flex gap-4 ">
              <button className="flex items-center cursor-pointer gap-2  rounded px-2 py-1 bg-[#f4f4f4]">
                Calendar view{' '}
                <>
                  <Image
                    src={'/calendar.png'}
                    alt="calendar"
                    width={20}
                    height={20}
                  />
                </>
              </button>
              <button className="flex items-center cursor-pointer gap-2  rounded px-2 py-1 bg-[#f4f4f4]">
                Automation{' '}
                <>
                  <Image
                    src={'/star.png'}
                    alt="automation"
                    width={20}
                    height={20}
                  />
                </>
              </button>
              <button className="flex items-center cursor-pointer gap-2  rounded px-2 py-1 bg-[#f4f4f4]">
                Filter{' '}
                <>
                  <Image
                    src={'/filter.png'}
                    alt="filter"
                    width={20}
                    height={20}
                  />
                </>
              </button>
              <button className="flex items-center cursor-pointer gap-2  rounded px-2 py-1 bg-[#f4f4f4]">
                Share{' '}
                <>
                  <Image
                    src={'/share.png'}
                    alt="share"
                    width={20}
                    height={20}
                  />
                </>
              </button>
              <button
                onClick={() => setOpenForm(true)}
                className="bg-gradient-to-b md:inline-block hidden from-[#4C38C2] to-[#2F2188] text-white px-2 py-1 rounded-lg shadow-sm shadow-[#4C38C2] transition duration-300"
              >
                Create new
                <span className="bg-white text-[#4C38C2] rounded-full mx-1 px-[0.25rem]">
                  +
                </span>
              </button>
            </div>
          </div>
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
                  tasks={tasks.filter((task) => task.status === status)}
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
            <AddTaskForm
              addTask={addNewTask}
              // closeForm={() => setOpenForm(false)}
              columnStatus={columnStatus}
            />
          </Modal>
        </div>
      </div>
    </DragDropContext>
  );
}
