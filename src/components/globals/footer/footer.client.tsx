"use client";

import Image from "next/image";
import Link from "next/link";

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
  return (
    <footer className="bg-white border-t border-border py-6">
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
            <p className="max-w-lg text-muted text-sm font-normal">{data.description}</p>
          </div>

          {/* Social media section */}
          <div className="max-w-md space-y-4 flex flex-col items-start">
            <p className="text-muted text-sm font-normal">Follow us</p>
            <div className="flex gap-3">
              {data.socialLinks?.map((link, idx) => (
                <Button variant="circle" size="clear" key={idx} className="group h-8 w-8 cursor-pointer shadow-none rounded-full bg-primary hover:bg-primary-dark flex items-center justify-center">
                  <Link href={link.link} aria-label={link.title} target="_blank" rel="noopener noreferrer">
                    <SocialMediaIcon name={link.icon as string} className="h-4 w-4 text-secondary group-hover:text-primary-foreground" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation menu */}
        <nav className="py-4 border-t border-border">
          <div className="flex items-center justify-between">
            <ul className="flex flex-wrap gap-8">
              {data.navigationLinks?.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.url} className="text-muted hover:text-primary-dark text-sm font-normal transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex gap-4">
              {/* {data.contactLinks?.map((link, idx) => (
                <Button variant="circle" size="clear" key={idx} className="group h-8 w-8 cursor-pointer shadow-none rounded-full bg-primary hover:bg-primary-dark flex items-center justify-center">
                  <Link href={link.value} aria-label={link.type} target="_blank" rel="noopener noreferrer">
                    <SocialMediaIcon name={link.icon as string} className="h-4 w-4 text-secondary group-hover:text-primary-foreground" />
                  </Link>
                </Button>
              ))} */}
            </ul>
          </div>
        </nav>

        {/* Bottom section */}
        <div className="pt-2 border-t border-border flex flex-col lg:flex-row justify-between items-center gap-4">
          <p className="text-muted hover:text-primary-dark text-sm font-normal">{data.copyright || "© 2025 Old City. All rights reserved."}</p>
          <div className="flex gap-6 text-sm text-muted">
            {data.licenceLinks?.map((link, idx) => (
              <Link key={idx} href={link.url} className="text-muted hover:text-primary-dark text-sm font-normal transition-colors">
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
