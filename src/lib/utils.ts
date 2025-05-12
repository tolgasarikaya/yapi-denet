// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { provinces } from "@/constants/provinceData";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatProvinceId(id: string): string {
  return id.replace(/^0+/, "");
}

export function getProvinceNameById(id: string): string | undefined {
  const province = provinces.find((p) => p.id === id);
  return province?.name;
}

export function formatPhoneNumber(phone: string): string {
  // Önce tüm boşlukları ve özel karakterleri temizle
  const cleaned = phone.replace(/\D/g, "");

  // Numaranın uzunluğunu kontrol et
  if (cleaned.length === 10) {
    // 5321234567 -> 0532 123 45 67 formatına dönüştür
    return `0${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(
      6,
      8
    )} ${cleaned.slice(8, 10)}`;
  } else if (cleaned.length === 11 && cleaned.startsWith("0")) {
    // 05321234567 -> 0532 123 45 67 formatına dönüştür
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(
      7,
      9
    )} ${cleaned.slice(9, 11)}`;
  }

  // Formatlanamayan numaraları olduğu gibi döndür
  return phone;
}
