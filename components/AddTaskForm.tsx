'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  FaHeading,
  FaTasks,
  FaExclamationCircle,
  FaCalendarAlt,
  FaPen,
  FaPlus,
} from 'react-icons/fa';
interface AddTaskFormProps {
  columnStatus: string;
  closeForm: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({
  columnStatus,
  closeForm,
}) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('medium');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');

  let userId: string | null = null;

  if (typeof window !== 'undefined') {
    userId = localStorage.getItem('__uid');
  }
  useEffect(() => {
    setStatus(columnStatus);
  }, [columnStatus]);

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      toast.error('Please login first');
      return;
    }
    const newTask = {
      userId: userId,
      title,
      status,
      priority,
      deadline,
      description,
    };

    try {
      const res = await fetch('/api/task/create-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      })
        .then((res) => res.json())
        .then((data) =>
          data.task
            ? toast.success('Task created successfully')
            : toast.error('Error creating task')
        );
      closeForm();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="text-[#666666] bg-white">
      <form onSubmit={addTask}>
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-b text-3xl w-full py-2 px-3 focus:outline-none "
            placeholder="Title"
            required
          />
        </div>
        <div className="mb-4 flex items-baseline gap-2">
          <label className="flex gap-2 items-center    mb-2">
            <FaTasks className="inline-block mr-2" /> Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full py-2 px-3 focus:outline-none"
            required
          >
            <option value="" disabled selected>
              Not selected
            </option>
            <option value="to-do">To-Do</option>
            <option value="in-progress">In Progress</option>
            <option value="under-review">Under Review</option>
            <option value="finished">Finished</option>
          </select>
        </div>
        <div className="mb-4 flex  items-baseline gap-2">
          <label className="flex gap-2 items-center    mb-2">
            <FaExclamationCircle className="inline-block mr-2" /> Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className=" w-full py-2 px-3 focus:outline-none "
            required
          >
            <option value="" disabled selected>
              Not selected
            </option>
            <option value="urgent">Urgent</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="mb-4 flex items-baseline gap-2">
          <label className="flex gap-2 items-center    mb-2">
            <FaCalendarAlt className="inline-block mr-2" /> Deadline
          </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className=" w-full py-2 px-3 focus:outline-none "
            required
          />
        </div>
        <div className="mb-4 flex items-baseline gap-2">
          <label className="flex gap-2 items-center    mb-2">
            <FaPen className="inline-block mr-2" /> Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className=" w-full py-2 px-3 focus:outline-none "
            placeholder="Enter description"
            rows={3}
            required
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-t from-[#202020] to-[#393939] text-white  py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
