"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LanguagesButton } from "@/components/ui/languages";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { Menu } from "@/components/ui/menu";

interface Navigation {
  label: string;
  url: string;
}

interface HeaderData {
  logo: {
    url: string;
    alt?: string;
  };
  navigations: Navigation[];
}

const Header = ({ data }: { data: HeaderData }) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const isHomeLanguagePath = ["/ru", "/en", "/uz"].includes(pathname);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getHeaderClasses = () => {
    if (isHomeLanguagePath) {
      return `sticky z-50 transition-all duration-300 ${isScrolled ? "bg-primary-dark top-0 py-4 shadow-lg" : "bg-transparent top-6"}`;
    }
    return "bg-primary-dark top-0 py-4 sticky z-50";
  };

  const getAbsoluteUrl = (url: string) => {
    if (url.startsWith("/")) {
      return url;
    }
    return `/${url}`;
  };

  return (
    <header className={getHeaderClasses()}>
      <div className="container px-8">
        <div className="flex items-center justify-between px-4">
          <div className="flex flex-shrink-0 items-center">
            <div className="relative h-10 w-32">{data.logo?.url && <Image src={data.logo.url} alt={data.logo.alt || "Logo"} fill className="object-contain" priority sizes="(max-width: 768px) 120px, 200px" />}</div>
          </div>

          <div className="hidden flex-1 items-center justify-center md:flex">
            <nav aria-label="Main Navigation" className="flex items-center justify-center xl:gap-4">
              {data.navigations?.map((item: Navigation, index: number) => {
                const absoluteUrl = getAbsoluteUrl(item.url);
                return (
                  <Button key={index} variant={pathname === absoluteUrl ? "nav_active" : "nav"} size="nav" className="rounded-xl" asChild>
                    <Link href={absoluteUrl}>{item.label}</Link>
                  </Button>
                );
              })}
            </nav>
          </div>

          <div className="flex flex-shrink-0 items-center gap-2">
            <LanguagesButton />
            <ThemeSwitcher />
            <div className="md:hidden">
              <Menu navigations={data.navigations} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
