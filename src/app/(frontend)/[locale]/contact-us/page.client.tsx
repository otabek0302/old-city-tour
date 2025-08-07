"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "@/providers/i18n";

interface ContactUsPageClientProps {
  heading: string;
  subheading: string;
  form_info: {
    heading: string;
    subheading: string;
  };
  contact_info: {
    heading: string;
    subheading: string;
    email: string;
    phone: string;
    address: string;
    business_hours: string;
  };
}

const ContactUsPageClient = ({ heading, subheading, form_info, contact_info }: ContactUsPageClientProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error(t("forms.validation.fillRequiredFields"));
      return;
    }

    setIsSubmitting(true);

    try {
      // Telegram bot configuration
      const telegramToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || "8350645290:AAHcjzo0hMse7vIN7XD_u4Sbx4NKd-4MlKM";
      const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || "-1002896625144";

      // Format the message for Telegram
      const text = `🆕 New Contact Form Submission

👤 Name: ${formData.name}
📧 Email: ${formData.email}
📞 Phone: ${formData.phone || "Not provided"}
📝 Subject: ${formData.subject}
💬 Message: ${formData.message}
⏰ Submitted at: ${new Date().toLocaleString()}`;

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
        toast.success(t("success.messageSent"));
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        const responseData = await response.json();
        throw new Error(`Failed to send message: ${responseData.description || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(t("forms.validation.sendFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="min-h-screen py-6 sm:py-8 md:py-10">
      <div className="container">
        <div className="mb-6 sm:mb-8 border-b border-copy-light pb-4 sm:pb-6">
          <h2 className="text-copy text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-3 sm:mb-4">
            {t("pages.contact.title")}
          </h2>
          <p className="text-copy-light text-sm sm:text-base font-normal leading-tight">
            {t("pages.contact.subtitle")}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          <div className="border border-border rounded-2xl p-6 sm:p-8">
            {form_info?.heading && (
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                {form_info?.heading}
              </h2>
            )}
            {form_info?.subheading && (
              <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
                {form_info?.subheading}
              </p>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    {t("pages.contact.form.name")} *
                  </Label>
                  <Input 
                    id="name" 
                    name="name" 
                    type="text" 
                    required 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder={t("pages.contact.form.namePlaceholder")} 
                    className="border-border rounded-[10px]" 
                    disabled={isSubmitting} 
                  />
                </div>
                <div>
                  <Label htmlFor="email">{t("pages.contact.form.email")} *</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    required 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder={t("pages.contact.form.emailPlaceholder")} 
                    className="border-border rounded-[10px]" 
                    disabled={isSubmitting} 
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">{t("pages.contact.form.phone")}</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  type="tel" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  placeholder={t("pages.contact.form.phonePlaceholder")} 
                  className="border-border rounded-[10px]" 
                  disabled={isSubmitting} 
                />
              </div>

              <div>
                <Label htmlFor="subject">{t("pages.contact.form.subject")} *</Label>
                <Input 
                  id="subject" 
                  name="subject" 
                  type="text" 
                  required 
                  value={formData.subject} 
                  onChange={handleChange} 
                  placeholder={t("pages.contact.form.subjectPlaceholder")} 
                  className="border-border rounded-[10px]" 
                  disabled={isSubmitting} 
                />
              </div>

              <div>
                <Label htmlFor="message">{t("pages.contact.form.message")} *</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  required 
                  value={formData.message} 
                  onChange={handleChange} 
                  placeholder={t("pages.contact.form.messagePlaceholder")} 
                  className="border-border rounded-[10px]" 
                  disabled={isSubmitting} 
                />
              </div>

              <Button type="submit" variant="primary" size="xxl" className="py-2.5 w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    <span className="text-primary-foreground text-sm font-medium">
                      {t("pages.contact.form.sending")}
                    </span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    <span className="text-primary-foreground text-sm font-medium">
                      {t("pages.contact.form.send")}
                    </span>
                  </>
                )}
              </Button>
            </form>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="bg-blue-100 p-2 sm:p-3 rounded-full flex-shrink-0">
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                  {t("pages.contact.info.email")}
                </h3>
                <p className="text-gray-700 text-sm sm:text-base">
                  {contact_info?.email || "info@oldcity.com"}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="bg-green-100 p-2 sm:p-3 rounded-full flex-shrink-0">
                <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                  {t("pages.contact.info.phone")}
                </h3>
                <p className="text-gray-700 text-sm sm:text-base">
                  {contact_info?.phone || "+1 (555) 123-4567"}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="bg-purple-100 p-2 sm:p-3 rounded-full flex-shrink-0">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                  {t("pages.contact.info.office")}
                </h3>
                <p className="text-gray-700 text-sm sm:text-base">
                  {contact_info?.address || "123 Travel Street, Tourism City, TC 12345"}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="bg-orange-100 p-2 sm:p-3 rounded-full flex-shrink-0">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                  {t("pages.contact.info.businessHours")}
                </h3>
                <p className="text-gray-700 text-sm sm:text-base">
                  {contact_info?.business_hours || "Monday - Friday: 9:00 AM - 6:00 PM"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsPageClient;
