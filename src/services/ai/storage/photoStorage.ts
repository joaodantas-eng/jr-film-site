// Abstração de onde a foto enviada pelo cliente fica guardada. Hoje a foto
// nunca sai do navegador (usamos apenas a URL local do arquivo, via
// URL.createObjectURL) — nenhum upload acontece. Quando um backend/storage
// real existir (S3, Cloud Storage etc.), basta implementar PhotoStorage com
// a mesma interface e trocar a instância usada pelo PhotoUploader.
export interface StoredPhoto {
  id: string;
  previewUrl: string;
  file: File;
}

export interface PhotoStorage {
  save: (file: File) => StoredPhoto;
  release: (photo: StoredPhoto) => void;
}

function save(file: File): StoredPhoto {
  return {
    id: `${file.name}-${file.lastModified}`,
    previewUrl: URL.createObjectURL(file),
    file,
  };
}

function release(photo: StoredPhoto) {
  URL.revokeObjectURL(photo.previewUrl);
}

export const inMemoryPhotoStorage: PhotoStorage = { save, release };
