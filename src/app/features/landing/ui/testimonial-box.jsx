import { ChevronLeft, ChevronRight, QuoteIcon } from "lucide-react";

function TestimonialBox({
  testimonial: data,
  index,
  list,
  currentIndex,
  isTransition,
  onNext,
  onPrev,
}) {
  const { name, role, company, testimonial, avatar } = data;
  return (
    <div
      style={{
        transform: `translateX(${(index - currentIndex) * 100}%)`,
      }}
      className={`${
        isTransition
          ? "!transition-transform  !duration-500 ease-in"
          : "!transition-none"
      } absolute gap-[6rem] p-[3rem] grid grid-cols-[10rem_1fr]`}
    >
      <div className="w-[10rem] border-[0.5rem] border-green-500 h-[10rem] overflow-hidden rounded-full">
        <img src={avatar} className="w-full h-full" alt={name} />
      </div>
      <div>
        <div>
          <span className="text-green-500">
            <QuoteIcon />
          </span>
          <p className="text-[2.4rem]">{testimonial}</p>
          <div className="flex justify-between relative items-center">
            <div className="mt-[2rem]">
              <p>&mdash; {name}</p>
              <span className="text-secondary-text-color text-[1.4rem]">
                {role} - {company}{" "}
              </span>
            </div>
            <div className="flex  absolute right-0 gap-[1rem] items-center text-secondary-text-color">
              <button
                onClick={onPrev}
                className="bg-gradient-to-t from-green-500 to-green-600 w-[3.5rem] h-[3.5rem] rounded-full flex items-center justify-center text-white"
              >
                <ChevronLeft size={20} />{" "}
              </button>
              <div className="flex items-center gap-[1rem]">
                {list.map((_, i) => (
                  <button
                    onClick={() => {}}
                    key={i}
                    className={`${
                      currentIndex === i + 1
                        ? "bg-gradient-to-t from-green-500 to-green-600"
                        : "bg-gray-300"
                    } w-[1rem] h-[1rem] rounded-full `}
                  >
                    &nbsp;
                  </button>
                ))}
              </div>
              <button
                onClick={onNext}
                className="bg-gradient-to-t !transition-none from-green-500 to-green-600 w-[3.5rem] h-[3.5rem] rounded-full flex items-center justify-center text-white"
              >
                <ChevronRight size={20} />{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialBox;
