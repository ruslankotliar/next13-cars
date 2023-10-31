import { Schema, model, models } from 'mongoose';
import { LanguageDocument } from '@/types';

const languageSchema = new Schema<LanguageDocument>({
  code: {
    type: String,
    required: true
  },
  targetWebsiteId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

export const LanguageModel = models.Language || model<LanguageDocument>('Language', languageSchema);
