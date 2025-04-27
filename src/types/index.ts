// types/index.ts
export interface Contact {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  isFavorite?: boolean;
  notes?: string;
  tags?: string[];
  avatar?: string;
}

export type FormMode = 'add' | 'edit';

export interface ContactFormData {
  name: string;
  email: string;
  phoneNumber: string;
  notes?: string;
  tags?: string[];
}

export type ViewMode = 'grid' | 'list';