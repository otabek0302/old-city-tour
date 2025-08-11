import { useState } from "react";
import { Type } from "@/payload-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "@/providers/i18n";
import { Button } from "@/components/ui/button";

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
  const { t } = useTranslation();
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

  const resetFilters = () => {
    setSelectedTypes([]);
    setPriceRange([0, 100000]);
    setDurationRange([0, 100]);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Filter By */}
      <Card className="bg-card border border-border rounded-2xl">
        <CardHeader className="py-3 sm:py-4 px-4 sm:px-6 cursor-pointer" onClick={() => toggleSection("filterBy")}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-copy text-sm sm:text-base font-semibold">{t("pages.tours.filterBy")}</CardTitle>
            {expandedSections.filterBy ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </CardHeader>
        {expandedSections.filterBy && (
          <CardContent className="pb-3 sm:pb-4 px-4 sm:px-6 space-y-2">
            {tourTypes.map((type) => (
              <div key={type.id} className="flex items-center space-x-2">
                <Checkbox id={type.id.toString()} className="w-5 h-5" checked={selectedTypes.includes(type.id.toString())} onCheckedChange={(checked) => handleTypeChange(type.id.toString(), checked as boolean)} />
                <Label htmlFor={type.id.toString()} className="text-copy-lighter text-sm font-normal">
                  {typeof type.title === "string" ? type.title : (type.title as any)?.en || "Untitled"}
                </Label>
              </div>
            ))}
          </CardContent>
        )}
      </Card>

      {/* Price */}
      <Card className="bg-card border border-border rounded-2xl">
        <CardHeader className="py-3 sm:py-4 px-4 sm:px-6 cursor-pointer" onClick={() => toggleSection("price")}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-copy text-sm sm:text-base font-semibold">{t("pages.tours.price")}</CardTitle>
            {expandedSections.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </CardHeader>
        {expandedSections.price && (
          <CardContent className="pb-3 sm:pb-4 px-4 sm:px-6 space-y-2">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="min-price" className="text-copy-lighter text-sm font-normal">
                  {t("pages.tours.min")}
                </Label>
                <Input
                  id="min-price"
                  type="number"
                  value={priceRange[0] || ""}
                  onChange={(e) => {
                    const value = Math.max(0, parseInt(e.target.value) || 0);
                    if (value <= priceRange[1]) {
                      setPriceRange([value, priceRange[1]]);
                    }
                  }}
                  placeholder="0"
                  className="rounded-xl text-sm"
                  min={0}
                  max={priceRange[1]}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="max-price" className="text-copy-lighter text-sm font-normal">
                  {t("pages.tours.max")}
                </Label>
                <Input
                  id="max-price"
                  type="number"
                  value={priceRange[1] || ""}
                  onChange={(e) => {
                    const value = Math.max(priceRange[0], parseInt(e.target.value) || 0);
                    setPriceRange([priceRange[0], value]);
                  }}
                  placeholder="0"
                  className="rounded-xl text-sm"
                  min={priceRange[0]}
                />
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Length */}
      <Card className="bg-card border border-border rounded-2xl">
        <CardHeader className="py-3 sm:py-4 px-4 sm:px-6 cursor-pointer" onClick={() => toggleSection("length")}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-copy text-sm sm:text-base font-semibold">{t("pages.tours.duration")}</CardTitle>
            {expandedSections.length ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </CardHeader>
        {expandedSections.length && (
          <CardContent className="pb-3 sm:pb-4 px-4 sm:px-6 space-y-2">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="min-length" className="text-copy-lighter text-sm font-normal">
                  {t("pages.tours.min")}
                </Label>
                <Input
                  id="min-length"
                  type="number"
                  value={durationRange[0] || ""}
                  onChange={(e) => {
                    const value = Math.max(0, parseInt(e.target.value) || 0);
                    if (value <= durationRange[1]) {
                      setDurationRange([value, durationRange[1]]);
                    }
                  }}
                  placeholder="0"
                  className="rounded-xl text-sm"
                  min={0}
                  max={durationRange[1]}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="max-length" className="text-copy-lighter text-sm font-normal">
                  {t("pages.tours.max")}
                </Label>
                <Input
                  id="max-length"
                  type="number"
                  value={durationRange[1] || ""}
                  onChange={(e) => {
                    const value = Math.max(durationRange[0], parseInt(e.target.value) || 0);
                    setDurationRange([durationRange[0], value]);
                  }}
                  placeholder="0"
                  className="rounded-xl text-sm"
                  min={durationRange[0]}
                />
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Reset Button */}
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={resetFilters} className="bg-primary-light text-primary-foreground hover:bg-primary-dark transition-colors duration-200">
          {t("components.filters.reset") || "Reset Filters"}
        </Button>
      </div>
    </div>
  );
};

export default ToursFilter;
