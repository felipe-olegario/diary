import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Progress from "../components/initial/progress";
import Button from "../components/button";

interface ComponentNameProps {
  exampleProp?: string;
}

interface SlideProps {
  index: number;
  logoSrc: string;
  imageSrc: string;
  title: string;
  description: string;
  buttonText: string;
  onNext: () => void;
}

const Slide: React.FC<SlideProps> = ({
  index,
  logoSrc,
  imageSrc,
  title,
  description,
  buttonText,
  onNext
}) => (
  <div className="flex flex-col justify-between items-center px-10 h-[600px]">
    <Image src={logoSrc} alt="Logo" width={150} height={50} priority />
    <Image src={imageSrc} alt="Illustration" width={250} height={200} priority />
    <h1 className="text-4xl font-bold mb-4">{title}</h1>
    <p className="text-lg font-medium">{description}</p>
    <div className="flex justify-between items-center w-full">
      <Progress indexSelected={index} />
      <Button text={buttonText} onClick={onNext} />
    </div>
  </div>
);

const ComponentName: React.FC<ComponentNameProps> = ({ exampleProp }) => {
  const [index, setIndex] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    if (index < 1) {
      const timeout = setTimeout(() => {
        setIndex((prevIndex) => prevIndex + 1);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  const handleNext = () => {
    if (index < slidesData.length) {
      setIndex((prevIndex) => prevIndex + 1);
    } else {
      router.push("/register"); // Redireciona para a próxima página
    }
  };

  const slidesData = [
    {
      logoSrc: "/logo.svg",
      imageSrc: "/girl-studying.svg",
      title: "Diário com segurança",
      description: "Guarde suas memórias de forma segura e protegida!",
      buttonText: "Próximo"
    },
    {
      logoSrc: "/logo.svg",
      imageSrc: "/graphic.svg",
      title: "Gráfico de humor",
      description: "Podemos mostrar qual parte do ano te deixou feliz, triste ou irritado com gráficos legais!",
      buttonText: "Próximo"
    },
    {
      logoSrc: "/logo.svg",
      imageSrc: "/search-image.svg",
      title: "Diário de pesquisa",
      description: "Pesquise facilmente em seu diário para reviver uma memória específica!",
      buttonText: "Próximo"
    },
    {
      logoSrc: "/logo.svg",
      imageSrc: "/security-image.svg",
      title: "Mais seguro",
      description: "Salve memórias com PIN, bloqueio de rosto e selfie de intruso",
      buttonText: "Próximo"
    }
  ];

  return (
    <div className="max-w-[1050px] mx-auto w-full h-[100dvh] relative">
      <TransitionGroup>
        <CSSTransition key={index} timeout={{ enter: 600, exit: 500 }} classNames="fade" unmountOnExit>
          <div className="absolute inset-0 flex items-center justify-center">
            {index === 0 ? (
              <div>
                <Image src="/logo.svg" alt="Vercel Logo" width={150} height={50} priority />
              </div>
            ) : (
              <Slide
                index={index}
                logoSrc={slidesData[index - 1].logoSrc}
                imageSrc={slidesData[index - 1].imageSrc}
                title={slidesData[index - 1].title}
                description={slidesData[index - 1].description}
                buttonText={index < slidesData.length ? "Próximo" : "Finalizar"}
                onNext={handleNext}
              />
            )}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default ComponentName;
