import { Document } from 'mongoose';

interface TranslationDocument extends Document {
  key: string;
  targetWebsiteId: string;
  translations: Record<string, string>;
}

export type { TranslationDocument };
