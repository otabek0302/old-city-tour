"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AboutUsClientProps {
  content: any;
  locale: string;
}

const AboutUsClient: React.FC<AboutUsClientProps> = ({ content, locale }) => {
  // Fallback content if no CMS content is available
  const fallbackContent = {
    title: locale === "es" ? "Sobre Nosotros" : "About Us",
    description: locale === "es" ? "Somos una empresa dedicada a proporcionar experiencias de viaje excepcionales en ciudades históricas de todo el mundo." : "We are a company dedicated to providing exceptional travel experiences in historic cities around the world.",
    mission: locale === "es" ? "Nuestra misión es conectar a los viajeros con la rica historia y cultura de las ciudades antiguas, creando recuerdos inolvidables." : "Our mission is to connect travelers with the rich history and culture of ancient cities, creating unforgettable memories.",
    vision: locale === "es" ? "Nuestra visión es ser el líder mundial en experiencias de viaje culturales y educativas." : "Our vision is to be the world leader in cultural and educational travel experiences.",
  };

  const displayContent = content || fallbackContent;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">{displayContent.title}</h1>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{locale === "es" ? "Nuestra Misión" : "Our Mission"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{displayContent.mission}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{locale === "es" ? "Nuestra Visión" : "Our Vision"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{displayContent.vision}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{locale === "es" ? "Sobre Old City" : "About Old City"}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{displayContent.description}</p>
            <p className="text-gray-600">{locale === "es" ? "Fundada con la pasión por el patrimonio cultural y la historia, Old City se ha convertido en un referente para los viajeros que buscan experiencias auténticas y enriquecedoras." : "Founded with a passion for cultural heritage and history, Old City has become a reference for travelers seeking authentic and enriching experiences."}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutUsClient;
