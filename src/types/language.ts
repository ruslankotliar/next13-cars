import { Schema } from 'mongoose';

interface Language {
  code: string;
  targetWebsiteId: Schema.Types.ObjectId;
  name: string;
  isDefault: boolean;
}

interface LanguageDocument extends Document, Language {}

export type { Language, LanguageDocument };
