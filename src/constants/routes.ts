import {
  BarChart3,
  Building2,
  Beaker,
  User,
  Wrench,
  UserCog,
  HardHat,
  ListTree,
} from "lucide-react";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  PROVINCE_DETAILS: (id: string) => `/provinces/${id}`,
};

export const ICON_MAP: Record<string, React.ElementType> = {
  BarChart3: BarChart3,
  Building2: Building2,
  Beaker: Beaker,
  User: User,
  Wrench: Wrench,
  UserCog: UserCog,
  HardHat: HardHat,
  ListTree: ListTree,
};

// Tablo türleri ve etiketleri
export const TABLE_TYPES = [
  { id: "statistics", label: "İSTATİSTİK", icon: "BarChart3" },
  { id: "inspection-orgs", label: "YAPI DENETİM KURULUŞU", icon: "Building2" },
  { id: "labs", label: "LABORATUVAR", icon: "Beaker" },
  { id: "inspectors", label: "DENETÇİ", icon: "User" },
  { id: "engineers", label: "YKE MİMAR/MÜHENDİS", icon: "Wrench" },
  { id: "assistants", label: "YARDIMCI KONTROL ELEMANI", icon: "UserCog" },
  { id: "site-chiefs", label: "ŞANTİYE ŞEFİ", icon: "HardHat" },
  { id: "distribution", label: "DAĞITIM LİSTESİ", icon: "ListTree" },
];
