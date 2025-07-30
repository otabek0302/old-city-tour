import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PhoneIcon, MailIcon, MapPinIcon } from "lucide-react";

interface Faq {
  id: string;
  question: string;
  answer: string;
}

interface FaqProps {
  faqs: Faq[];
  heading: string;
  subheading?: string;
  contacts: {
    phone: string;
    email: string;
    address: string;
  };
}

const Faq = ({ faqs, contacts, heading, subheading }: FaqProps) => {
  return (
    <section className="py-8">
      <div className="container">
        <div className="mb-8 max-w-2xl">
          {heading && <h2 className="text-copy text-2xl md:text-4xl font-bold leading-normal">{heading}</h2>}
          {subheading && <p className="text-copy-light text-sm font-normal leading-tight mt-2">{subheading}</p>}
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="w-full lg:w-1/3 flex flex-row lg:flex-col flex-wrap gap-4 lg:gap-2">
            <p className="flex items-center lg:gap-2">
              <PhoneIcon className="w-4 h-4 inline-block mr-2 text-primary" />
              <span className="text-copy-light text-sm font-normal leading-tight">{contacts.phone}</span>
            </p>
            <p className="flex items-center lg:gap-2">
              <MailIcon className="w-4 h-4 inline-block mr-2 text-primary" />
              <span className="text-copy-light text-sm font-normal leading-tight">{contacts.email}</span>
            </p>
            <p className="flex items-center lg:gap-2">
              <MapPinIcon className="w-4 h-4 inline-block mr-2 text-primary" />
              <span className="text-copy-light text-sm font-normal leading-tight">{contacts.address}</span>
            </p>
          </div>
          <div className="w-full lg:w-2/3">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((item) => (
                <AccordionItem key={item.id} value={item.id} className="bg-background rounded-xl shadow-none border border-primary px-6">
                  <AccordionTrigger className="text-copy text-lg font-semibold hover:no-underline py-6">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-copy-light text-base leading-relaxed pb-6 border-t border-primary pt-6">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
