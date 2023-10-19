import { Document } from 'mongoose';

interface TranslationDocument extends Document {
  key: string;
  translations: Record<string, string>;
}

export type { TranslationDocument };
