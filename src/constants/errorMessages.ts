export const ERROR_MESSAGES = {
  // Genel hata
  GENERIC_ERROR: "Bilinmeyen hata",

  // Veri yükleme hatası
  LOAD_FAILED: (entityName: string) =>
    `${entityName} verileri yüklenirken bir sorun oluştu`,

  // Veri bulunamadı
  NO_DATA: (entityName: string) => `Herhangi bir ${entityName} bulunamadı`,
};
