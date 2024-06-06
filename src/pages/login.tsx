import React, { useState } from "react";
import Link from "next/link"; // Importando o componente Link do Next.js
import Input from "../components/input";
import Button from "../components/button";
import Image from "next/image";
import { useRouter } from "next/router";
import Toast from "../components/toast"; // Importando o componente Toast

interface ComponentNameProps {
    exampleProp?: string;
}

const ComponentName: React.FC<ComponentNameProps> = ({ exampleProp }) => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Erro ao fazer login');
            }

            const { token } = await response.json();
            localStorage.setItem('token', token);

            console.log("User logged in successfully");
            router.push("/home"); // Redireciona para a próxima página
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                setTimeout(() => setError(""), 3000); // Clear the error after 3 seconds
            } else {
                setError("An unexpected error occurred");
                setTimeout(() => setError(""), 3000); // Clear the error after 3 seconds
            }
        }
    };

    return (
        <div className="max-w-[1050px] mx-auto w-full h-[100vh] relative flex items-center">
            <div className="absolute flex flex-col items-center justify-center w-full">
                <Image src="/logo.svg" alt="Logo" width={150} height={50} priority className="mb-6"/>
                <h1 className="text-2xl font-bold">Como foi seu dia? 🤔</h1>

                <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-4">
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={setEmail}
                        placeholder="Digite seu email"
                        required
                    />
                    <Input
                        label="Senha"
                        type="password"
                        value={password}
                        onChange={setPassword}
                        placeholder="Digite sua senha"
                        required
                    />
                    
                    <div className="flex flex-col items-center">
                        {/* Adicionando o link para a tela de login */}
                        <Link href="/register" className="text-black hover:underline mb-4 font-bold">
                            Não tem uma conta? Realize o cadastro
                        </Link>
                        <Button
                            widthFull={true}
                            text="Enviar"
                        />
                    </div>
                </form>
            </div>
            {error && <Toast message={error} onClose={() => setError("")} />}
        </div>
    );
};

export default ComponentName;
