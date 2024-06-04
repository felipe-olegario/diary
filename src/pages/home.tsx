import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import Image from 'next/image';

const HomePage: React.FC = () => {
    const router = useRouter();

    // Verifica se estamos no lado do cliente antes de acessar localStorage
    if (typeof window !== 'undefined') {
        // Recupera o token JWT armazenado no localStorage
        const token = localStorage.getItem('token');

        // Decodifica o token JWT para obter os dados do usuário, como o ID do usuário
        const decodedToken: any = jwt.decode(token ?? '');

        // Obtém o ID do usuário do token decodificado
        const userId = decodedToken ? decodedToken.userId : null;

        // Use o ID do usuário conforme necessário
        console.log('User ID:', userId);
    }

    return (
        <div className="max-w-[1050px] mx-auto w-full h-[100vh] relative bg-gray-200">
            <div className="flex flex-col py-8 px-4">
                <div className='flex justify-between items-center'>
                    <Image src="/logo.svg" alt="Logo" width={80} height={50} priority/>
                    <Image src="/notification.svg" alt="Logo" width={25} height={25} priority/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
