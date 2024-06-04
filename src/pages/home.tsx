import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const HomePage: React.FC = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken: any = jwt.decode(token);
          const id = decodedToken?.userId;
          const name = decodedToken?.name;
          setUserName(name);
          setUserId(id);
        } catch (error) {
          console.error("Error decoding token:", error);
          // Handle token decoding error (e.g., redirect to login)
        } finally {
          setIsLoading(false); // Set loading state to false after processing
        }
      } else {
        // Handle case where token is not found (e.g., redirect to login)
        setIsLoading(false);
      }
    }
  }, []); // Empty dependency array to run only on initial render

  return (
    <div className="max-w-[1050px] mx-auto w-full h-[100vh] relative bg-gray-200">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          Loading...
        </div>
      ) : (
        <div className="flex flex-col py-8 px-4">
          <div className='flex justify-between items-center mb-10'>
            <Image src="/logo.svg" alt="Logo" width={80} height={50} priority/>
            <Image src="/notification.svg" alt="Logo" width={25} height={25} priority/>
          </div>
          <div className='flex flex-col bg-white rounded-md p-4 items-center'>
            {userName && <span className='font-lg'>Olá, {userName}</span>}
            <h1 className='text-2xl font-bold'>Como você está hoje?</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
