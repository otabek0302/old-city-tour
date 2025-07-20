import React from "react";
import { Type } from "@/payload-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";

interface TourFilterProps {
  tourTypes: Type[];
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  durationRange: [number, number];
  setDurationRange: (range: [number, number]) => void;
}

const TourFilter: React.FC<TourFilterProps> = ({ tourTypes, selectedTypes, setSelectedTypes, priceRange, setPriceRange, durationRange, setDurationRange }) => {
  const [expandedSections, setExpandedSections] = React.useState({
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
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => toggleSection("filterBy")}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Filter By</CardTitle>
            {expandedSections.filterBy ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </CardHeader>
        {expandedSections.filterBy && (
          <CardContent className="space-y-3">
            <div className="text-sm text-gray-600 mb-3">Discover tours by type</div>
            {tourTypes.map((type) => (
              <div key={type.id} className="flex items-center space-x-2">
                <Checkbox id={type.id.toString()} checked={selectedTypes.includes(type.id.toString())} onCheckedChange={(checked) => handleTypeChange(type.id.toString(), checked as boolean)} />
                <Label htmlFor={type.id.toString()} className="text-sm font-medium">
                  {type.title}
                </Label>
              </div>
            ))}
            {/* Default tour types if none exist */}
            {tourTypes.length === 0 && (
              <>
                <div className="flex items-center space-x-2">
                  <Checkbox id="nature" />
                  <Label htmlFor="nature" className="text-sm font-medium">
                    Nature and Outdoors
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="urban" />
                  <Label htmlFor="urban" className="text-sm font-medium">
                    Urban and City life
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="cultural" />
                  <Label htmlFor="cultural" className="text-sm font-medium">
                    Cultural and Heritage
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="family" />
                  <Label htmlFor="family" className="text-sm font-medium">
                    Family Friendly
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="luxury" />
                  <Label htmlFor="luxury" className="text-sm font-medium">
                    Luxury and Exclusive
                  </Label>
                </div>
              </>
            )}
          </CardContent>
        )}
      </Card>

      {/* Price */}
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => toggleSection("price")}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Price</CardTitle>
            {expandedSections.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </CardHeader>
        {expandedSections.price && (
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="min-price" className="text-sm text-gray-600">
                  Min
                </Label>
                <Input id="min-price" type="number" value={priceRange[0]} onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])} placeholder="0$" className="mt-1" />
              </div>
              <div className="flex-1">
                <Label htmlFor="max-price" className="text-sm text-gray-600">
                  Max
                </Label>
                <Input id="max-price" type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])} placeholder="0$" className="mt-1" />
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(priceRange[1] / 10000) * 100}%` }} />
            </div>
          </CardContent>
        )}
      </Card>

      {/* Length */}
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => toggleSection("length")}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Length</CardTitle>
            {expandedSections.length ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </CardHeader>
        {expandedSections.length && (
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>min. {durationRange[0]} days</span>
              <span>{durationRange[1]}+ days</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${((durationRange[1] - durationRange[0]) / 18) * 100}%` }} />
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default TourFilter;
