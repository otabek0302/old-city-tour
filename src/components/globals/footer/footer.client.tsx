"use client";

import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SocialMediaIcon } from "@/components/ui/social-media-icons";

interface SocialLink {
  title: string;
  link: string;
  icon: string;
}

interface NavigationLink {
  label: string;
  url: string;
}

interface ContactLink {
  type: "phone" | "email" | "address";
  value: string;
  icon?: string;
}

interface FooterData {
  socialLinks: SocialLink[];
  navigationLinks: NavigationLink[];
  licenceLinks: NavigationLink[];
  contactLinks: ContactLink[];
  copyright: string;
  description?: string;
  logo?: {
    url: string;
    alt?: string;
  };
}

const FooterClient = ({ data }: { data: FooterData }) => {
  const pathname = usePathname();
  const isHomeLanguagePath = ["/ru", "/en", "/uz"].includes(pathname);

  return (
    <footer className={`${isHomeLanguagePath ? "border-t border-border" : "bg-primary-dark"} py-6`}>
      <div className="container">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-start gap-6">
          {/* Logo */}
          <div className="flex-1 py-4">
            <div className="flex items-center gap-6">
              {data.logo?.url && (
                <div className="relative h-32 w-80">
                  <Image src={data.logo.url} alt={data.logo.alt || "Logo"} fill className="object-contain" priority sizes="calc(100vw - 32px)" />
                </div>
              )}
            </div>
            <p className={`${isHomeLanguagePath ? "max-w-lg text-copy-light text-sm font-normal leading-tight" : "max-w-lg text-gray-300 hover:text-copy-white text-sm font-normal leading-tight"}`}>{data.description}</p>
          </div>

          {/* Social media section */}
          <div className="max-w-md space-y-4 flex flex-col items-start">
            <p className={`${isHomeLanguagePath ? "text-copy-light text-sm font-normal leading-tight" : "text-gray-300 hover:text-copy-white text-sm font-normal leading-tight"}`}>Follow us</p>
            <div className="flex gap-3">
              {data.socialLinks?.map((link, idx) => (
                <Button variant="social_media" size="icon" key={idx} className="group flex items-center justify-center">
                  <Link href={link.link} aria-label={link.title} target="_blank" rel="noopener noreferrer">
                    <SocialMediaIcon name={link.icon as string} className="h-4 w-4 lg:h-5 lg:w-5 text-inherit" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation menu */}
        <nav className={`${isHomeLanguagePath ? "py-4 border-y border-border" : "py-4"}`}>
          <div className="flex items-center justify-between">
            <ul className="flex flex-wrap gap-8">
              {data.navigationLinks?.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.url} className={`${isHomeLanguagePath ? "text-copy-light hover:text-copy text-sm font-normal transition-colors" : "text-gray-300 hover:text-copy-white text-sm font-normal"}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Bottom section */}
        <div className="pt-2 flex flex-col lg:flex-row justify-between items-center gap-4">
          <p className={`${isHomeLanguagePath ? "text-copy-lighter hover:text-copy text-sm font-normal" : "text-gray-300 hover:text-copy-white text-sm font-normal"}`}>{data.copyright || "© 2025 Old City. All rights reserved."}</p>
          <div className="flex gap-6 text-sm">
            {data.licenceLinks?.map((link, idx) => (
              <Link key={idx} href={link.url} className={`${isHomeLanguagePath ? "text-copy-lighter hover:text-copy text-sm font-normal" : "text-gray-300 hover:text-copy-white text-sm font-normal"}`}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterClient;
