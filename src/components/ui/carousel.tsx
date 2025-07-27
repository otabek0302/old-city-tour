import React from "react";

interface CarouselProps {
  children: React.ReactNode;
}

export const Carousel: React.FC<CarouselProps> = ({ children }) => {
  return (
    <div className="w-full overflow-x-auto whitespace-nowrap rounded-t-lg">
      <div className="flex gap-2">{children}</div>
    </div>
  );
};

interface CarouselItemProps {
  children: React.ReactNode;
}

export const CarouselItem: React.FC<CarouselItemProps> = ({ children }) => {
  return <div className="inline-block w-full">{children}</div>;
};

export default Carousel; 