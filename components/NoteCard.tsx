import Image from 'next/image';
import React from 'react';

interface NoteCardProps {
  title: string;
  icon: string;
  content: string;
}
const NoteCard: React.FC<NoteCardProps> = ({ icon, title, content }) => {
  return (
    <div className="flex gap-2 text-sm rounded-lg my-4 p-2 bg-[#ffffff]">
      <div className="flex items-center">
        {' '}
        <Image src={icon} alt="icon" width={120} height={100} />
      </div>
      <div>
        <p className="text-[#757575] font-semibold">{title}</p>
        <p className="text-[#868686]">{content}</p>
      </div>
    </div>
  );
};

export default NoteCard;
