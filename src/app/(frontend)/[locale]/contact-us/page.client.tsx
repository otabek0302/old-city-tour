"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

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
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Telegram bot configuration
      const telegramToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || "8350645290:AAHcjzo0hMse7vIN7XD_u4Sbx4NKd-4MlKM";
      const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || "-1002896625144";

      // Format the message for Telegram
      const text = `🆕 New Contact Form Submission <br> 👤 Name: ${formData.name} <br> 📧 Email: ${formData.email} <br> 📞 Phone: ${formData.phone || "Not provided"} <br> 📝 Subject: ${formData.subject} <br> 💬 Message: ${formData.message} <br>  ⏰ Submitted at: ${new Date().toLocaleString()}`;

      const response = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: "HTML",
        }),
      });

      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.");
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
      toast.error("Failed to send message. Please try again later.");
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
    <section className="min-h-screen py-8">
      <div className="container">
        <div className={`${!heading && !subheading ? "mb-0" : "mb-8"} max-w-2xl pl-1`}>
          {heading && <h2 className="text-copy text-2xl md:text-4xl font-bold leading-normal">{heading}</h2>}
          {subheading && <p className="text-copy-light text-sm font-normal leading-tight mt-2">{subheading}</p>}
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="border border-border rounded-2xl p-8">
            {form_info?.heading && <h2 className="text-2xl font-bold text-gray-900 mb-6">{form_info?.heading}</h2>}
            {form_info?.subheading && <p className="text-gray-700 mb-6">{form_info?.subheading}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Full Name *
                  </Label>
                  <Input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Your full name" className="border-border rounded-[10px]" disabled={isSubmitting} />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="your.email@example.com" className="border-border rounded-[10px]" disabled={isSubmitting} />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 123-4567" className="border-border rounded-[10px]" disabled={isSubmitting} />
              </div>

              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input id="subject" name="subject" type="text" required value={formData.subject} onChange={handleChange} placeholder="What&apos;s this about?" className="border-border rounded-[10px]" disabled={isSubmitting} />
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea id="message" name="message" required value={formData.message} onChange={handleChange} placeholder="Tell us more about your inquiry..." className="border-border rounded-[10px]" disabled={isSubmitting} />
              </div>

              <Button type="submit" variant="primary" size="xxl" className="py-2.5 w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    <span className="hidden md:inline text-primary-foreground text-sm font-medium">Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    <span className="hidden md:inline text-primary-foreground text-sm font-medium">Send Message</span>
                  </>
                )}
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                <p className="text-gray-700">{contact_info?.email || "info@oldcity.com"}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                <p className="text-gray-700">{contact_info?.phone || "+1 (555) 123-4567"}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Office</h3>
                <p className="text-gray-700">{contact_info?.address || "123 Travel Street, Tourism City, TC 12345"}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                <p className="text-gray-700">{contact_info?.business_hours || "Monday - Friday: 9:00 AM - 6:00 PM"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsPageClient;
