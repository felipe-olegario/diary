import Image from 'next/image';
import React from 'react';

interface ComponentNameProps {
  exampleProp?: string;
}

const Navbar: React.FC<ComponentNameProps> = ({ exampleProp }) => {
  return (
    <div className='bg-white h-20 w-full fixed bottom-0 left-0 flex justify-between items-center px-6 skew-x-10'>
      <div className='flex gap-10'>
        <Image src="/navbar/home.svg" alt="Logo" width={20} height={20} priority />
        <Image src="/navbar/graphic.svg" alt="Logo" width={20} height={20} priority />
      </div>
      <div className='gradient-custom h-11 w-11 rounded-full flex items-center justify-center'>
        <Image src="/add-icon.svg" alt="Logo" width={20} height={20} priority />
      </div>
      <div className='flex gap-10'>
        <Image src="/navbar/calendar.svg" alt="Logo" width={20} height={20} priority />
        <Image src="/navbar/config.svg" alt="Logo" width={20} height={20} priority />
      </div>
    </div>
  );
};

export default Navbar;
