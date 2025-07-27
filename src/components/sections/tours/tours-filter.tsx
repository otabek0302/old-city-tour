import { useState } from "react";
import { Type } from "@/payload-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TourFilterProps {
  tourTypes: Type[];
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  durationRange: [number, number];
  setDurationRange: (range: [number, number]) => void;
}

const ToursFilter: React.FC<TourFilterProps> = ({ tourTypes, selectedTypes, setSelectedTypes, priceRange, setPriceRange, durationRange, setDurationRange }) => {
  const [expandedSections, setExpandedSections] = useState({
    filterBy: true,
    price: true,
    length: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleTypeChange = (typeId: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, typeId]);
    } else {
      setSelectedTypes(selectedTypes.filter((id) => id !== typeId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter By */}
      <Card className="bg-card border border-border rounded-2xl">
        <CardHeader className="py-4 px-6 cursor-pointer" onClick={() => toggleSection("filterBy")}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-copy text-base font-semibold">Filter By</CardTitle>
            {expandedSections.filterBy ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </CardHeader>
        {expandedSections.filterBy && (
          <CardContent className="pb-4 px-6 space-y-2">
            {tourTypes.map((type) => (
              <div key={type.id} className="flex items-center space-x-2">
                <Checkbox id={type.id.toString()} className="w-4 h-4" checked={selectedTypes.includes(type.id.toString())} onCheckedChange={(checked) => handleTypeChange(type.id.toString(), checked as boolean)} />
                <Label htmlFor={type.id.toString()} className={`text-copy-lighter text-sm font-normal`}>
                  {type.title}
                </Label>
              </div>
            ))}
          </CardContent>
        )}
      </Card>

      {/* Price */}
      <Card className="bg-card border border-border rounded-2xl">
        <CardHeader className="py-4 px-6 cursor-pointer" onClick={() => toggleSection("price")}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-copy text-base font-semibold">Price</CardTitle>
            {expandedSections.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </CardHeader>
        {expandedSections.price && (
          <CardContent className="pb-4 px-6 space-y-2">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="min-price" className="text-copy-lighter text-sm font-normal">
                  Min
                </Label>
                <Input id="min-price" type="number" value={priceRange[0]} onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])} placeholder="0$" className="rounded-xl" />
              </div>
              <div className="flex-1">
                <Label htmlFor="max-price" className="text-copy-lighter text-sm font-normal">
                  Max
                </Label>
                <Input id="max-price" type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])} placeholder="0$" className="rounded-xl" />
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Length */}
      <Card className="bg-card border border-border rounded-2xl">
        <CardHeader className="py-4 px-6 cursor-pointer" onClick={() => toggleSection("length")}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-copy text-base font-semibold">Length</CardTitle>
            {expandedSections.length ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </CardHeader>
        {expandedSections.length && (
          <CardContent className="pb-4 px-6 space-y-2">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="min-length" className="text-copy-lighter text-sm font-normal">
                  Min
                </Label>
                <Input id="min-length" type="number" value={durationRange[0]} onChange={(e) => setDurationRange([parseInt(e.target.value) || 0, durationRange[1]])} placeholder="0" className="rounded-xl" />
              </div>
              <div className="flex-1">
                <Label htmlFor="max-length" className="text-copy-lighter text-sm font-normal">
                  Max
                </Label>
                <Input id="max-length" type="number" value={durationRange[1]} onChange={(e) => setDurationRange([durationRange[0], parseInt(e.target.value) || 0])} placeholder="0" className="rounded-xl" />
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ToursFilter;
