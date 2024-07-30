import Image from 'next/image';
import React from 'react';

interface NavProps {
  username: string | undefined;
  logout: () => void;
}
const Navbar: React.FC<NavProps> = ({ username, logout }) => {
  return (
    <div className="w-[40%] text-[#555555] px-4 h-screen bg-[#ffffff] shadow-md flex flex-col relative">
      <div className="flex items-center gap-2  pt-5">
        <div className="rounded-full border border-blue-600 p-2">
          <Image
            src="/account.png"
            alt="user"
            className="rounded-full"
            width={20}
            height={20}
          />
        </div>

        <p className=" font-semibold">{username}</p>
      </div>
      <div className="flex justify-between pt-2">
        <div className="flex gap-4  items-center">
          <div>
            <Image
              className="cursor-pointer"
              src={'/nav1.png'}
              alt="nav"
              width={20}
              height={20}
            />
          </div>
          <div>
            <Image
              className="cursor-pointer"
              src={'/nav2.png'}
              alt="nav"
              width={20}
              height={20}
            />
          </div>
          <div>
            <Image
              className="cursor-pointer"
              src={'/nav3.png'}
              alt="nav"
              width={20}
              height={20}
            />
          </div>
        </div>
        <button
          onClick={logout}
          className="p-2 cursor-pointer bg-[#f4f4f4] rounded"
        >
          Logout
        </button>
      </div>
      <div className="flex flex-col">
        <div className="flex">
          <ul className="pt-3 w-full">
            <li className="flex cursor-pointer gap-2 items-center bg-[#f4f4f4] rounded p-2">
              <div>
                <Image src={'/home.png'} alt="home" width={20} height={20} />
              </div>
              <span>Home</span>
            </li>
            <li className="flex cursor-pointer gap-2 items-center hover:bg-[#f4f4f4] rounded p-2">
              <div>
                <Image src={'/board.png'} alt="board" width={20} height={20} />
              </div>
              <span>Boards</span>
            </li>
            <li className="flex cursor-pointer gap-2 items-center hover:bg-[#f4f4f4] rounded p-2">
              <div>
                <Image
                  src={'/settings.png'}
                  alt="settings"
                  width={20}
                  height={20}
                />
              </div>
              <span>Settings</span>
            </li>
            <li className="flex cursor-pointer gap-2 items-center hover:bg-[#f4f4f4] rounded p-2">
              <div>
                <Image src={'/people.png'} alt="team" width={20} height={20} />
              </div>
              <span>Teams</span>
            </li>
            <li className="flex cursor-pointer gap-2 items-center hover:bg-[#f4f4f4] rounded p-2">
              <div>
                <Image
                  src={'/analytics.png'}
                  alt="analytics"
                  width={20}
                  height={20}
                />
              </div>
              <span>Analytics</span>
            </li>
          </ul>
        </div>
        <div className=" py-4">
          <button className="w-full bg-gradient-to-b from-[#4C38C2] to-[#2F2188] text-white py-2 rounded-lg shadow-sm shadow-[#4C38C2] transition duration-300">
            Create new task{' '}
            <span className="bg-white text-[#4C38C2] rounded-full px-[0.25rem]">
              +
            </span>
          </button>
        </div>
        <button className="flex gap-1 absolute bottom-8  bg-[#f4f4f4] rounded-lg px-2 py-1">
          <div>
            <Image
              src={'/download.png'}
              alt="download"
              width={40}
              height={40}
            />
          </div>
          <div>
            <p className=" text-gray-600 ">Download the app</p>
            <p className="text-sm text-gray-500">Get the full experience</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
