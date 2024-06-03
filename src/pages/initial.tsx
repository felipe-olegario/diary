import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Progress from "../components/initial/progress";
import Button from "../components/button";

interface ComponentNameProps {
  exampleProp?: string;
}

const ComponentName: React.FC<ComponentNameProps> = ({ exampleProp }) => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (index < 1) {
      const timeout = setTimeout(() => {
        setIndex((prevIndex) => prevIndex + 1);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <div className="max-w-[1050px] mx-auto w-full h-[100dvh] relative">
      <TransitionGroup>
        <CSSTransition
          key={index}
          timeout={{ enter: 600, exit: 500 }}
          classNames="fade"
          unmountOnExit
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {index === 0 && (
              <div>
                <Image
                  src="/logo.svg"
                  alt="Vercel Logo"
                  width={150}
                  height={50}
                  priority
                />
              </div>
            )}
            {index === 1 && (
              <div className="flex flex-col justify-between items-center px-10 h-[600px]">
                <Image
                  src="/logo.svg"
                  alt="Vercel Logo"
                  width={150}
                  height={50}
                  priority
                />
                <Image
                  src="/girl-studying.svg"
                  alt="Vercel Logo"
                  width={250}
                  height={200}
                  priority
                />
                <h1 className="text-4xl font-bold mb-4">
                  Diário com segurança
                </h1>
                <p className="text-lg font-medium">
                  Guarde suas memórias de forma segura e protegida!
                </p>
                <div className="flex justify-between items-center w-full">
                  <Progress indexSelected={index} />
                  <Button
                    text="Próximo"
                    onClick={() => setIndex((prevIndex) => prevIndex + 1)}
                  />
                </div>
              </div>
            )}
            {index === 2 && (
              <div className="flex flex-col justify-between items-center px-10 h-[600px]">
                <Image
                  src="/logo.svg"
                  alt="Vercel Logo"   
                  width={150}
                  height={50}
                  priority
                />
                <Image
                  src="/graphic.svg"
                  alt="Vercel Logo"
                  width={250}
                  height={200}
                  priority
                />
                <h1 className="text-4xl font-bold mb-4">
                  Gráfico de humor
                </h1>
                <p className="text-lg font-medium">
                  Podemos mostrar qual parte do ano te deixou feliz, triste ou irritado com gráficos legais!
                </p>
                <div className="flex justify-between items-center w-full">
                  <Progress indexSelected={index} />
                  <Button
                    text="Próximo"
                    onClick={() => setIndex((prevIndex) => prevIndex + 1)}
                  />
                </div>
              </div>
            )}
            {index === 3 && (
              <div className="flex flex-col justify-between items-center px-10 h-[600px]">
                <Image
                  src="/search-image.svg"
                  alt="Vercel Logo"   
                  width={150}
                  height={50}
                  priority
                />
                <Image
                  src="/graphic.svg"
                  alt="Vercel Logo"
                  width={250}
                  height={200}
                  priority
                />
                <h1 className="text-4xl font-bold mb-4">
                  Diário de pesquisa
                </h1>
                <p className="text-lg font-medium">
                  Pesquise facilmente em seu diário para reviver uma memória específica!
                </p>
                <div className="flex justify-between items-center w-full">
                  <Progress indexSelected={index} />
                  <Button
                    text="Próximo"
                    onClick={() => setIndex((prevIndex) => prevIndex + 1)}
                  />
                </div>
              </div>
            )}
            {index === 4 && (
              <div className="flex flex-col justify-between items-center px-10 h-[600px]">
                <Image
                  src="/security-image.svg"
                  alt="Vercel Logo"
                  width={150}
                  height={50}
                  priority
                />
                <Image
                  src="/graphic.svg"
                  alt="Vercel Logo"
                  width={250}
                  height={200}
                  priority
                />
                <h1 className="text-4xl font-bold mb-4">
                  Diário de pesquisa
                </h1>
                <p className="text-lg font-medium">
                  Pesquise facilmente em seu diário para reviver uma memória específica!
                </p>
                <div className="flex justify-between items-center w-full">
                  <Progress indexSelected={index} />
                  <Button
                    text="Próximo"
                    onClick={() => setIndex((prevIndex) => prevIndex + 1)}
                  />
                </div>
              </div>
            )}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default ComponentName;
