import { ChevronLeft, ChevronRight, QuoteIcon } from "lucide-react";
import Heading from "../ui/heading";
import TestimonialBox from "../ui/testimonial-box";
import { useEffect, useRef, useState } from "react";
const testimonials = [
  {
    name: "Mariana Costa",
    role: "Gerente de Projetos",
    company: "TechWave Solutions",
    testimonial:
      "O TeoChat transformou completamente a forma como nossa equipe se comunica. Antes tínhamos 5 apps diferentes, agora tudo está em um só lugar. Simples, rápido e eficiente!",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "João Ferreira",
    role: "CEO",
    company: "InovaDigital",
    testimonial:
      "Desde que implementamos o TeoChat, nossas reuniões ficaram muito mais objetivas. Economizamos horas toda semana e nossa produtividade disparou.",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Beatriz Mendes",
    role: "Líder de Marketing",
    company: "Criativa Agency",
    testimonial:
      "A integração de chat, chamadas e agenda no TeoChat trouxe uma organização que nunca conseguimos com outras ferramentas. Recomendo de olhos fechados!",
    avatar: "https://i.pravatar.cc/150?img=29",
  },
  {
    name: "Carlos Lima",
    role: "Desenvolvedor Sênior",
    company: "CodeHub",
    testimonial:
      "O recurso de segurança com criptografia de ponta a ponta me deixa tranquilo em compartilhar informações confidenciais. O time inteiro se adaptou super rápido.",
    avatar: "https://i.pravatar.cc/150?img=55",
  },
  {
    name: "Ana Rodrigues",
    role: "Coordenadora de RH",
    company: "PeopleFirst",
    testimonial:
      "A comunicação interna ficou mais humanizada com o TeoChat. O time está mais engajado, unido e com uma sensação real de colaboração.",
    avatar: "https://i.pravatar.cc/150?img=36",
  },
];

const extendedSlides = [
  testimonials[testimonials.length - 1],
  ...testimonials,
  testimonials[0],
];
function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransition, setIsTransition] = useState(true);
  const interval = useRef();
  const startInterval = () => {
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 5000);
  };
  useEffect(() => {
    startInterval();
    return () => clearInterval(interval.current);
  }, []);
  useEffect(() => {
    if (currentIndex === extendedSlides.length - 1) {
      setTimeout(() => {
        setIsTransition(false);
        setCurrentIndex(1);
      }, 1000);
    }
    if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransition(false);
        setCurrentIndex(extendedSlides.length - 2);
      }, 1000);
    } else {
      setIsTransition(true);
    }
  }, [currentIndex]);
  function handleNext() {
    clearInterval(interval.current);
    setCurrentIndex((prev) => prev + 1);
    startInterval();
  }
  function handlePrev() {
    clearInterval(interval.current);
    setCurrentIndex((prev) => prev - 1);
    startInterval();
  }
  function handleGoToSlide(index) {
    clearInterval(interval.current);
    setCurrentIndex(index);
    startInterval();
  }
  return (
    <section className="flex flex-col gap-[6rem] ">
      <Heading
        isCenter={true}
        description="Vê o que os nossos clientes dizem sobre o TeoChat"
      >
        Testemunhos
      </Heading>
      <div className="bg-white p-[6rem]">
        <div className="max-w-[100rem] min-h-[30rem] p-[3rem] relative  overflow-hidden flex justify-center  m-[0_auto] ">
          {extendedSlides.map((testimonial, index) => (
            <TestimonialBox
              list={testimonials}
              index={index}
              isTransition={isTransition}
              currentIndex={currentIndex}
              key={index}
              onNext={handleNext}
              onPrev={handlePrev}
              onGoto={handleGoToSlide}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
