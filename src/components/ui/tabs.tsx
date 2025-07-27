import * as React from "react";

interface TabsProps {
  _value: string;
  _onValueChange: (val: string) => void;
  className?: string;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ _value, _onValueChange, className, children }) => {
  return <div className={className}>{children}</div>;
};

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}
export const TabsList: React.FC<TabsListProps> = ({ className, children }) => (
  <div className={`flex gap-2 border-b ${className || ""}`}>{children}</div>
);

interface TabsTriggerProps {
  _value: string;
  children: React.ReactNode;
}
export const TabsTrigger: React.FC<TabsTriggerProps> = ({ _value, children }) => (
  <button type="button" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary border-b-2 border-transparent focus:outline-none focus:text-primary focus:border-primary transition-colors">
    {children}
  </button>
);

interface TabsContentProps {
  _value: string;
  children: React.ReactNode;
}
export const TabsContent: React.FC<TabsContentProps> = ({ _value, children }) => <div>{children}</div>; 