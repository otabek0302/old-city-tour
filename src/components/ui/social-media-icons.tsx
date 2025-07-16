import { FC } from "react";
import { Facebook, Instagram, Send, MessageCircle, Twitter, Youtube, Linkedin, Globe, CircleHelp, Mail, Phone, MapPin } from "lucide-react";

type SocialIconName = "facebook" | "instagram" | "telegram" | "whatsapp" | "Email" | "Phone" | "twitter" | "youtube" | "linkedin" | "website" | "email" | "phone" | "address" | string;

interface SocialMediaIconProps {
  name: SocialIconName;
  size?: number;
  className?: string;
}

const iconMap: Record<string, FC<{ size?: number; className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  telegram: Send,
  whatsapp: MessageCircle,
  twitter: Twitter,
  youtube: Youtube,
  linkedin: Linkedin,
  website: Globe,
  email: Mail,
  phone: Phone,
  address: MapPin,
};

const SocialMediaIcon: FC<SocialMediaIconProps> = ({ name, size = 20, className = "" }) => {
  const Icon = iconMap[name.toLowerCase()] || CircleHelp;
  return <Icon size={size} className={className} />;
};

export { SocialMediaIcon };
export type { SocialIconName };
