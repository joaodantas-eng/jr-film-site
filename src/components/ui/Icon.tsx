import { LucideIconName } from "@/types";
import {
  Droplet,
  Settings2,
  Disc3,
  GaugeCircle,
  Scale,
  Wind,
  SunDim,
  Layers,
  Sparkles,
  ShieldCheck,
  Clock,
  Wrench,
  Award,
  Users,
  MapPin,
  Phone,
  MessageCircle,
  Instagram,
  Facebook,
  Star,
  ChevronRight,
  Menu,
  X,
  ArrowUpRight,
  Link2,
  CheckCircle2,
  HelpCircle,
  Calendar,
  ClipboardList,
  CarFront,
  Tag,
  BookOpen,
  ChevronDown,
  Home,
  Navigation,
  LucideProps,
} from "lucide-react";

// Mapa central de ícones: components pedem um ícone pelo nome (string tipada),
// nunca importam diretamente do lucide-react. Isso mantém o design system fechado
// e evita ícones "soltos" inconsistentes espalhados pelo projeto.
const iconMap: Record<LucideIconName, React.ComponentType<LucideProps>> = {
  Droplet,
  Settings2,
  Disc3,
  GaugeCircle,
  Scale,
  Wind,
  SunDim,
  Layers,
  Sparkles,
  ShieldCheck,
  Clock,
  Wrench,
  Award,
  Users,
  MapPin,
  Phone,
  MessageCircle,
  Instagram,
  Facebook,
  Star,
  ChevronRight,
  Menu,
  X,
  ArrowUpRight,
  Link2,
  CheckCircle2,
  HelpCircle,
  Calendar,
  ClipboardList,
  CarFront,
  Tag,
  BookOpen,
  ChevronDown,
  Home,
  Navigation,
};

interface IconProps extends LucideProps {
  name: LucideIconName;
}

export function Icon({ name, ...props }: IconProps) {
  const Component = iconMap[name];
  return <Component {...props} />;
}
