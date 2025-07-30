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
    <section className="py-16 bg-background">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8;">
        <div className="text-center mb-12">
          {title && <h2 className="text-3xl font-bold text-foreground mb-4">{title}</h2>}
          {description && <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statistics?.map((stat) => (
            <div key={stat?.id} className="text-center">
              <div className="mb-2">
                <span className="text-4xl font-bold text-primary">{stat?.number}</span>
              </div>
              <p className="text-sm text-muted-foreground font-medium">{stat?.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
