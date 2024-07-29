import Image from 'next/image';
import React from 'react';
import { FaHome, FaColumns, FaCog, FaUsers, FaChartLine } from 'react-icons/fa';

const Navbar: React.FC = () => {
  return (
    <div className="w-[45%] h-screen bg-white shadow-md flex flex-col">
      <div className="flex items-center gap-2 px-4 py-5 border-b">
        <div>
          <Image
            src="/user.png"
            alt="user"
            className="rounded-full"
            width={40}
            height={40}
          />
        </div>

        <p className="text-gray-900 font-semibold">Joe Gardner</p>
      </div>
      <div className="flex flex-col">
        <div className="flex">
          <ul className="px-4 pt-5 w-full">
            <li className="flex gap-2 items-center hover:bg-gray-100 rounded p-2">
              <FaHome className="text-gray-700" />
              <span className="text-gray-700">Home</span>
            </li>
            <li className="flex gap-2 items-center hover:bg-gray-100 rounded p-2">
              <FaColumns className="text-gray-700" />
              <span className="text-gray-700">Boards</span>
            </li>
            <li className="flex gap-2 items-center hover:bg-gray-100 rounded p-2">
              <FaCog className="text-gray-700" />
              <span className="text-gray-700">Settings</span>
            </li>
            <li className="flex gap-2 items-center hover:bg-gray-100 rounded p-2">
              <FaUsers className="text-gray-700" />
              <span className="text-gray-700">Teams</span>
            </li>
            <li className="flex gap-2 items-center hover:bg-gray-100 rounded p-2">
              <FaChartLine className="text-gray-700" />
              <span className="text-gray-700">Analytics</span>
            </li>
          </ul>
        </div>
        <div className="px-4 py-4">
          <button className="w-full bg-purple-600 text-white py-2 rounded-lg shadow hover:bg-purple-700 transition duration-300">
            Create new task +
          </button>
        </div>
        <div className="px-4 py-2 text-center">
          <button className="w-full text-gray-600 hover:underline">
            Download the app
          </button>
          <p className="text-sm text-gray-500">Get the full experience</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
