import { Document, Schema } from 'mongoose';

interface TranslationDocument extends Document {
  key: string;
  targetWebsiteId: Schema.Types.ObjectId;
  translations: Record<string, string>;
}

export type { TranslationDocument };
