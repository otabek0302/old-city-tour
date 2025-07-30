"use client";

interface Block {
  blockType: string;
  heading?: string;
  content?: string;
}

interface PageClientProps {
  _locale: string;
  privacyPolicy?: {
    title: string;
    sections: Block[];
  };
}

const PageClient = ({ _locale, privacyPolicy }: PageClientProps) => {
  if (!privacyPolicy) return null;

  return (
    <section className="py-6">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-copy text-2xl md:text-4xl font-bold leading-normal mb-2">{privacyPolicy.title}</h1>
          <p className="text-copy-light text-sm font-normal leading-tight">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8">
          {privacyPolicy.sections?.map((section: any, index: number) => (
            <div key={index} className="bg-background border border-border rounded-2xl p-6">
              {section.heading && (
                <h2 className="text-copy text-lg md:text-2xl font-bold leading-normal mb-4">
                  {section.heading}
                </h2>
              )}
              {section.content && (
                <div 
                  className="text-copy-light text-sm font-normal leading-tight prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: section.content }} 
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PageClient;
