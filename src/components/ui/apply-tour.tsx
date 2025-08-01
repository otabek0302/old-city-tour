"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./dialog";
import { toast } from "sonner";
import { useTranslation } from "@/providers/i18n";

interface ApplyTourProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  tour: {
    id: string | number;
    title: string;
    price?: number;
    duration?: string;
  };
  locale?: string;
}

export const ApplyTour = ({ open, setOpen, tour, locale: _locale = "en" }: ApplyTourProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    phone: "",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
    "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
    "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
    "Fiji", "Finland", "France",
    "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
    "Haiti", "Honduras", "Hungary",
    "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
    "Jamaica", "Japan", "Jordan",
    "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
    "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
    "Oman",
    "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
    "Qatar",
    "Romania", "Russia", "Rwanda",
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
    "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
    "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
    "Yemen",
    "Zambia", "Zimbabwe"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.country || !formData.phone.trim() || !formData.email.trim()) {
      toast.error(t("forms.validation.fillRequiredFields"));
      return;
    }

    setIsSubmitting(true);

    try {
      // Telegram bot configuration
      const telegramToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || "8350645290:AAHcjzo0hMse7vIN7XD_u4Sbx4NKd-4MlKM";
      const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || "-1002896625144";

      // Format the message for Telegram
      const text = `🎯 New Tour Application

                    🏷️ Tour: ${tour.title}
                    💰 Price: $${tour.price?.toLocaleString() || "N/A"}
                    ⏱️ Duration: ${tour.duration || "N/A"}

                    👤 Applicant Details
                    📝 First Name: ${formData.firstName}
                    📝 Last Name: ${formData.lastName}
                    🌍 Country: ${formData.country}
                    📞 Phone: ${formData.phone}
                    📧 Email: ${formData.email}

                    ⏰ Applied at: ${new Date().toLocaleString()}`;

      const response = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: "Markdown",
        }),
      });

      if (response.ok) {
        toast.success(t("pages.applyTour.success"));
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          country: "",
          phone: "",
          email: "",
        });
        setTimeout(() => {
          setOpen(false);
        }, 1500);
      } else {
        const responseData = await response.json();
        throw new Error(`Failed to submit application: ${responseData.description || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error(t("pages.applyTour.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDialogChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      setFormData({
        firstName: "",
        lastName: "",
        country: "",
        phone: "",
        email: "",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="w-[96%] sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-background border border-border rounded-[16px!important] mx-auto my-4">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-copy">{t("pages.applyTour.title")}</DialogTitle>
          <DialogDescription className="text-copy-light text-sm font-normal leading-tight">
            {t("pages.applyTour.subtitle")}: <strong>{tour.title}</strong>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         <div className="space-y-2">
               <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                 {t("pages.applyTour.form.firstName")} *
               </Label>
               <Input 
                 id="firstName" 
                 value={formData.firstName} 
                 onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))} 
                 placeholder={t("pages.applyTour.form.firstNamePlaceholder")} 
                 className="border-border rounded-[10px]" 
                 required 
                 disabled={isSubmitting} 
               />
             </div>

             <div className="space-y-2">
               <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                 {t("pages.applyTour.form.lastName")} *
               </Label>
               <Input 
                 id="lastName" 
                 value={formData.lastName} 
                 onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))} 
                 placeholder={t("pages.applyTour.form.lastNamePlaceholder")} 
                 className="border-border rounded-[10px]" 
                 required 
                 disabled={isSubmitting} 
               />
             </div>
          </div>

                     <div className="space-y-2">
             <Label htmlFor="country" className="text-sm font-medium text-gray-700">
               {t("pages.applyTour.form.country")} *
             </Label>
             <Select value={formData.country} onValueChange={(value) => setFormData((prev) => ({ ...prev, country: value }))} required>
               <SelectTrigger className="border-border rounded-[10px]" disabled={isSubmitting}>
                 <SelectValue placeholder={t("pages.applyTour.form.countryPlaceholder")} />
               </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

                     <div className="space-y-2">
             <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
               {t("pages.applyTour.form.phone")} *
             </Label>
             <Input 
               id="phone" 
               type="tel" 
               value={formData.phone} 
               onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))} 
               placeholder={t("pages.applyTour.form.phonePlaceholder")} 
               className="border-border rounded-[10px]" 
               required 
               disabled={isSubmitting} 
             />
           </div>

           <div className="space-y-2">
             <Label htmlFor="email" className="text-sm font-medium text-gray-700">
               {t("pages.applyTour.form.email")} *
             </Label>
             <Input 
               id="email" 
               type="email" 
               value={formData.email} 
               onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} 
               placeholder={t("pages.applyTour.form.emailPlaceholder")} 
               className="border-border rounded-[10px]" 
               required 
               disabled={isSubmitting} 
             />
           </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting} className="rounded-[10px]">
              {t("pages.applyTour.form.cancel")}
            </Button>
            <Button 
              type="submit" 
              variant="primary" 
              size="xxl" 
              disabled={isSubmitting || !formData.firstName || !formData.lastName || !formData.country || !formData.phone || !formData.email} 
              className="py-2.5 rounded-[10px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  <span className="inline text-primary-foreground text-sm font-medium">{t("pages.applyTour.form.submitting")}</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  <span className="inline text-primary-foreground text-sm font-medium">{t("pages.applyTour.form.submit")}</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};