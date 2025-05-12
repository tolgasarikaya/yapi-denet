// src/constants/errorMessages.ts

export const ERROR_MESSAGES = {
  // Genel hata mesajı
  GENERIC_ERROR: "Bilinmeyen hata",

  // Veri yükleme hatası mesajı
  LOAD_FAILED: (entityName: string) =>
    `${entityName} verileri yüklenirken bir sorun oluştu`,

  // Veri bulunamadı mesajı
  NO_DATA: (entityName: string) => `Herhangi bir ${entityName} bulunamadı`,
};
