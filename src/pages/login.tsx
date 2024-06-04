import React, { useState } from "react";
import Link from "next/link"; // Importando o componente Link do Next.js
import Input from "../components/input";
import Button from "../components/button";
import Image from "next/image";

interface ComponentNameProps {
    exampleProp?: string;
}

const ComponentName: React.FC<ComponentNameProps> = ({ exampleProp }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Adicione a lógica de submissão do formulário aqui
        console.log("Form submitted", { name, email, password });
    };

    return (
        <div className="max-w-[1050px] mx-auto w-full h-[100vh] relative">
            <div className="absolute flex flex-col items-center justify-center">
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
        </div>
    );
};

export default ComponentName;
