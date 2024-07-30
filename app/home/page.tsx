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
interface Task {
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
  }, [router]);

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

  const todoTasks = tasks?.filter((task) => task.status === 'to-do');
  const inProgressTasks = tasks?.filter(
    (task) => task.status === 'in-progress'
  );
  const underReviewTasks = tasks?.filter(
    (task) => task.status === 'under-review'
  );
  const finishedTasks = tasks?.filter((task) => task.status === 'finished');

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

  return (
    <div className="flex text-[#555555]">
      <Navbar logout={logout} username={user?.username} />{' '}
      <div className="bg-[#f7f7f7] px-4 py-12">
        <div className="flex justify-between">
          <p className="text-3xl text-black font-semibold">
            Good Morning, {user?.username}!
          </p>
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
        <div className="flex justify-between text-sm items-center gap-4 py-4">
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
                <Image src={'/share.png'} alt="share" width={20} height={20} />
              </>
            </button>
            <button className="bg-gradient-to-b from-[#4C38C2] to-[#2F2188] text-white px-2 py-1 rounded-lg shadow-sm shadow-[#4C38C2] transition duration-300">
              Create new
              <span className="bg-white text-[#4C38C2] rounded-full mx-1 px-[0.25rem]">
                +
              </span>
            </button>
          </div>
        </div>
        <div className="tasks_div bg-[#ffffff] min-h-[30rem] rounded-lg grid grid-cols-4 gap-2 p-2">
          <TaskColumn
            handleAddTask={openTaskForm}
            title="To do"
            tasks={todoTasks}
            status="to-do"
          />
          <TaskColumn
            handleAddTask={openTaskForm}
            title="In Progress"
            tasks={inProgressTasks}
            status="in-progress"
          />
          <TaskColumn
            handleAddTask={openTaskForm}
            title="Under Review"
            tasks={underReviewTasks}
            status="under-review"
          />
          <TaskColumn
            handleAddTask={openTaskForm}
            title="Finished"
            tasks={finishedTasks}
            status="finished"
          />
        </div>
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
  );
}
