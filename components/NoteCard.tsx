import Image from 'next/image';
import React from 'react';

interface NoteCardProps{
  title:string,
  icon:string,
  content:string
}
const NoteCard:React.FC<NoteCardProps> = ({ icon, title, content }) => {
  return <div className='flex gap-2 rounded p-2'>
    <Image src={icon} alt='icon' width={100} height={100}/>
    <div>
      <p className='text-[#757575] font-bold'>{title}</p>
      <p className='text-[#868686]'>{content}</p>
    </div>
    </div>;
};

export default NoteCard;
