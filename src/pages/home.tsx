import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Navbar from '../components/navbar';

const HomePage: React.FC = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  const configEmojis = [
    { color: 'bg-red-custom', emoji: 'sad', mood: 'SAD' },
    { color: 'bg-orange-custom', emoji: 'angry', mood: 'ANGRY' },
    { color: 'bg-yellow-custom', emoji: 'neutral', mood: 'NEUTRAL' },
    { color: 'bg-blue-custom', emoji: 'happy', mood: 'HAPPY' },
    { color: 'bg-green-custom', emoji: 'very-happy', mood: 'VERY_HAPPY' },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken: any = jwt.decode(token);
          if (!decodedToken || !decodedToken.userId) {
            throw new Error('Invalid token');
          }
          const id = decodedToken.userId;
          const name = decodedToken.name;
          setUserName(name);
          setUserId(id);
        } catch (error) {
          console.error("Error decoding token:", error);
          router.push('/login'); // Redirect to login if there's an error
        } finally {
          setIsLoading(false);
        }
      } else {
        router.push('/login'); // Redirect to login if no token found
      }
    }
  }, [router]); // Dependency array to run on initial render

  useEffect(() => {
    const checkMood = async () => {
      try {
        const response = await fetch(`/api/get-mood?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.mood) {
            setSelectedMood(data.mood);
            setDisabled(true);
          }
        }
      } catch (error) {
        console.error('Error fetching mood:', error);
      }
    };

    if (userId) {
      checkMood();
    }
  }, [userId]);

  const handleMoodClick = async (mood: string) => {
    try {
      const response = await fetch('/api/create-mood', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          mood,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save mood');
      }

      setSelectedMood(mood);
      setDisabled(true);

      const result = await response.json();
      console.log('Mood saved:', result);
      // You can add additional logic here, e.g., showing a success message
    } catch (error) {
      console.error('Error saving mood:', error);
      // Optionally handle the error, e.g., showing an error message
    }
  };

  return (
    <div className="max-w-[1050px] mx-auto w-full h-[100vh] relative bg-gray-100">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          Loading...
        </div>
      ) : (
        <div className="flex flex-col py-8 px-4">
          <div className='flex justify-between items-center mb-10'>
            <Image src="/logo.svg" alt="Logo" width={80} height={50} priority />
            <Image src="/notification.svg" alt="Notification" width={25} height={25} priority />
          </div>
          <div className='flex flex-col bg-white rounded-md px-4 py-6 items-center gap-3'>
            {userName && <span className='font-lg'>Olá, {userName}</span>}
            <h1 className='text-2xl font-bold mb-2'>Como você está hoje?</h1>
            <div className='flex gap-2'>
              {configEmojis.map((item, index) => (
                <div
                  key={index}
                  className={`${item.color} rounded-md border border-black h-14 w-10 flex items-center justify-center cursor-pointer`}
                  onClick={() => handleMoodClick(item.mood)}
                  style={{ opacity: selectedMood === item.mood ? 1 : 0.5, pointerEvents: disabled ? 'none' : 'auto' }}
                >
                  <Image src={`/emoji/${item.emoji}.svg`} alt={item.emoji} width={34} height={34} priority />
                </div>
              ))}
            </div>
          </div>
          <Navbar selectedPage='home'></Navbar>
        </div>
      )}
    </div>
  );
};

export default HomePage;
