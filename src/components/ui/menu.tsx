import Link from "next/link";

import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Menu as MenuIcon } from "lucide-react";

interface Navigation {
  label: string;
  url: string;
}

export const Menu = ({ navigations }: { navigations: Navigation[] }) => {
  // Ensure URLs are absolute paths
  const getAbsoluteUrl = (url: string) => {
    if (url.startsWith('/')) {
      return url;
    }
    return `/${url}`;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="icon" size="clear" className="block md:hidden group h-8 w-8 cursor-pointer shadow-none hover:bg-primary">
          <MenuIcon className="h-4 w-4 text-primary-foreground lg:h-5 lg:w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end" className="w-52 p-4">
        <nav className="flex flex-col items-end justify-center">
          {navigations?.map((item: Navigation, index: number) => {
            const absoluteUrl = getAbsoluteUrl(item.url);
            return (
              <Button key={index} variant="nav" asChild>
                <Link href={absoluteUrl}>
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </nav>
      </PopoverContent>
    </Popover>
  );
};
