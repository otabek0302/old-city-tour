"use client";

import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LanguagesButton } from "@/components/ui/languages";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { Menu } from "@/components/ui/menu";

interface Navigation {
  label: string;
  url: string;
  isExternal: boolean;
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

  const isHomeLanguagePath = ["/ru", "/en", "/uz"].includes(pathname);

  return (
    <header className={`${isHomeLanguagePath ? "bg-transparent top-6" : "bg-primary-dark top-0 py-4"} sticky z-50`}>
      <div className="container px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex flex-shrink-0 items-center">
            <div className="relative h-10 w-32">{data.logo?.url && <Image src={data.logo.url} alt={data.logo.alt || "Logo"} fill className="object-contain" priority sizes="(max-width: 768px) 120px, 200px" />}</div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden flex-1 items-center justify-center md:flex">
            <nav aria-label="Main Navigation" className="flex items-center justify-center gap-4">
              {data.navigations?.map((item: Navigation, index: number) => (
                <Button key={index} variant={pathname === item.url ? "nav_active" : "nav"} size="nav" className="rounded-xl" asChild>
                  <Link href={item.url} target={item.isExternal ? "_blank" : undefined} rel={item.isExternal ? "noopener noreferrer" : undefined}>
                    {item.label}
                  </Link>
                </Button>
              ))}
            </nav>
          </div>

          {/* Mobile & Utility Buttons */}
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
