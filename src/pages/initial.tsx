import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface ComponentNameProps {
  exampleProp?: string;
}

const ComponentName: React.FC<ComponentNameProps> = ({ exampleProp }) => {
  const [index, setIndex] = useState<number>(0);
  const [inProp, setInProp] = useState<boolean>(true);

  useEffect(() => {
    if (inProp) {
      const timeout = setTimeout(() => {
        setInProp(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [inProp]);

  const handleEntered = () => {
    setIndex((prevIndex) => (prevIndex + 1) % 3);
    setInProp(true);
  };

  return (
    <div className='flex items-center justify-center max-w-[1050px] mx-auto w-full h-[100dvh]'>
      <TransitionGroup>
        <CSSTransition
          key={index}
          in={inProp}
          timeout={500}
          classNames="fade"
          onEntered={handleEntered}
        >
          <div>
            {index === 0 && (
              <div>
                <Image
                  src="/logo.svg"
                  alt="Vercel Logo"
                  width={150}
                  height={50}
                  priority
                />
                <p>Content for index 0</p>
              </div>
            )}
            {index === 1 && (
              <div className='flex flex-col justify-between items-center px-10'>
                <Image
                  src="/logo.svg"
                  alt="Vercel Logo"
                  width={100}
                  height={50}
                  priority
                />
                <Image
                  src="/girl-studying.svg"
                  alt="Girl Studying"
                  width={200}
                  height={100}
                  priority
                />
                <h1 className='text-4xl font-bold mb-4'>Diário com segurança</h1>
                <p className='text-lg'>
                  Guarde suas memórias de forma segura e protegida!
                </p>
              </div>
            )}
            {index === 2 && (
              <div>
                <p>Content for index 2</p>
              </div>
            )}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default ComponentName;
