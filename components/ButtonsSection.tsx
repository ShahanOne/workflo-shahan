import Image from 'next/image';
import React from 'react';

interface ButtonsSectionProps {
  openForm: () => void;
}

const ButtonsSection: React.FC<ButtonsSectionProps> = ({ openForm }) => {
  return (
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
            <Image src={'/star.png'} alt="automation" width={20} height={20} />
          </>
        </button>
        <button className="flex items-center cursor-pointer gap-2  rounded px-2 py-1 bg-[#f4f4f4]">
          Filter{' '}
          <>
            <Image src={'/filter.png'} alt="filter" width={20} height={20} />
          </>
        </button>
        <button className="flex items-center cursor-pointer gap-2  rounded px-2 py-1 bg-[#f4f4f4]">
          Share{' '}
          <>
            <Image src={'/share.png'} alt="share" width={20} height={20} />
          </>
        </button>
        <button
          onClick={openForm}
          className="bg-gradient-to-b md:inline-block hidden from-[#4C38C2] to-[#2F2188] text-white px-2 py-1 rounded-lg shadow-sm shadow-[#4C38C2] transition duration-300"
        >
          Create new
          <span className="bg-white text-[#4C38C2] rounded-full mx-1 px-[0.25rem]">
            +
          </span>
        </button>
      </div>
    </div>
  );
};

export default ButtonsSection;
