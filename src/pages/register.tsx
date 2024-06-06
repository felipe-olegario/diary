import React, { useState } from "react";
import Link from "next/link"; // Importando o componente Link do Next.js
import Input from "../components/input";
import { useRouter } from "next/router";
import Button from "../components/button";
import Toast from "../components/toast"; // Import the Toast component

interface ComponentNameProps {
    exampleProp?: string;
}

const ComponentName: React.FC<ComponentNameProps> = ({ exampleProp }) => {
    const router = useRouter();
    const [index, setIndex] = useState<number>(0);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [document, setDocument] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    document,
                    phone,
                    password,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Erro ao criar usuário');
            }

            // User successfully registered, you can redirect or show a success message
            console.log("User registered successfully");
            router.push("/login"); // Redireciona para a próxima página
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unexpected error occurred");
            }
        }
    };

    const handleCloseToast = () => {
        setError(""); // Clear the error state to hide the toast
    };

    return (
        <div className="max-w-[1050px] mx-auto w-full h-[100vh] relative flex items-center">
            <div className="flex flex-col items-center justify-center mx-auto w-full">
                <span>Cadastre-se</span>
                <h1 className="text-2xl font-bold">Vamos começar!</h1>
                <span className="text-gray-400">Insira seus dados abaixo</span>
                <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-4">
                    <Input
                        label="Nome"
                        type="text"
                        value={name}
                        onChange={setName}
                        placeholder="Digite seu nome"
                        required
                    />
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={setEmail}
                        placeholder="Digite seu email"
                        required
                    />
                    <Input
                        label="CPF"
                        type="tel"
                        value={document}
                        onChange={setDocument}
                        placeholder="Digite seu CPF"
                        mask="999.999.999-99"
                        required
                    />
                    <Input
                        label="Celular"
                        type="tel"
                        value={phone}
                        onChange={setPhone}
                        placeholder="(11) 91331-7001"
                        mask="(99) 99999-9999"
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
                        <Link href="/login" className="text-black hover:underline mb-4 font-bold">
                            Já tem uma conta? Faça login
                        </Link>
                        <Button
                            widthFull={true}
                            text="Enviar"
                        />
                    </div>
                </form>
                {error && (
                    <Toast message={error} onClose={handleCloseToast} />
                )}
            </div>
        </div>
    );
};

export default ComponentName;
