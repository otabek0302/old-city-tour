import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Menu as MenuIcon } from "lucide-react";

interface Navigation {
  label: string;
  url: string;
}

export const Menu = ({ navigations }: { navigations: Navigation[] }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Ensure URLs are absolute paths
  const getAbsoluteUrl = (url: string) => {
    if (url.startsWith("/")) {
      return url;
    }
    return `/${url}`;
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="icon" size="clear" className="group flex items-center justify-center md:hidden h-8 w-8 relative">
          <MenuIcon className="h-4 w-4 text-primary-foreground lg:h-5 lg:w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end" className="w-64 p-6 bg-background border border-border rounded-xl shadow-lg" sideOffset={8}>
        <nav className="flex flex-col space-y-3">
          {navigations?.map((item: Navigation, index: number) => {
            const absoluteUrl = getAbsoluteUrl(item.url);
            const isActive = pathname === absoluteUrl;

            return (
              <Button key={index} variant={isActive ? "nav_active" : "nav"} size="nav" className={`w-full justify-start rounded-sm transition-all duration-200 ${isActive ? "bg-primary text-primary-foreground" : "bg-transparent text-copy hover:bg-primary hover:text-primary-foreground"}`} asChild onClick={handleLinkClick}>
                <Link href={absoluteUrl}>{item.label}</Link>
              </Button>
            );
          })}
        </nav>
      </PopoverContent>
    </Popover>
  );
};
