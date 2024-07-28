import Image from 'next/image';
import React from 'react';

interface AddNewBtnProps {
  status: string;
  handleAddTask: (status: string) => void;
}
const AddNewBtn: React.FC<AddNewBtnProps> = ({ status, handleAddTask }) => {
  return (
    <button
      onClick={() => handleAddTask(status)}
      className="flex items-center justify-between p-2 rounded-lg bg-gradient-to-t from-[#202020] to-[#393939]  text-[#e3e1e1]"
    >
      <span>Add new</span>
      <span className="text-2xl">+</span>
    </button>
  );
};

export default AddNewBtn;
