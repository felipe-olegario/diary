import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Input from "../components/input";
import Button from "../components/button";

interface ComponentNameProps {
    exampleProp?: string;
}

const ComponentName: React.FC<ComponentNameProps> = ({ exampleProp }) => {
    const [index, setIndex] = useState<number>(0);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [document, setDocument] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Adicione a lógica de submissão do formulário aqui
        console.log("Form submitted", { name, email, password });
    };

    return (
        <div className="max-w-[1050px] mx-auto w-full h-[100vh] relative">
            <div className="absolute flex flex-col items-center justify-center">
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
                    <div className="flex items-center justify-between">
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
