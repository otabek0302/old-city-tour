import Link from "next/link";

import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Menu as MenuIcon } from "lucide-react";

export const Menu = (data: { navigations: any[] }) => {
  const getNavigationUrl = (item: any) => {
    if (item.isExternal) return item.url;
    return `/${item.slug}`;
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
          {data.navigations?.map((item: any, index: number) => (
            <Button key={index} variant="nav" asChild>
              <Link href={getNavigationUrl(item)} target={item.isExternal ? "_blank" : undefined} rel={item.isExternal ? "noopener noreferrer" : undefined}>
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
      </PopoverContent>
    </Popover>
  );
};
