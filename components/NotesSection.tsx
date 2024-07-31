import React from 'react';
import NoteCard from './NoteCard';

const NotesSection = () => {
  return (
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
  );
};

export default NotesSection;
