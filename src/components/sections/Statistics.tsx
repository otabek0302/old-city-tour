import React from "react";

interface Statistic {
  id: string;
  number: string;
  label: string;
}

interface StatisticsProps {
  title?: string;
  description?: string;
  statistics: Statistic[];
}

const Statistics = ({ title, description, statistics }: StatisticsProps) => {
  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="container">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          {title && <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">{title}</h2>}
          {description && <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">{description}</p>}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {statistics?.map((stat) => (
            <div key={stat?.id} className="text-left md:text-center">
              <div className="mb-2">
                <span className="text-3xl sm:text-4xl font-bold text-primary">{stat?.number}</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium md:px-2">{stat?.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
