import { Schema, model, models } from 'mongoose';

import { TranslationDocument } from '@/types';

const translationSchema = new Schema<TranslationDocument>({
  key: {
    type: String,
    unique: true
  },
  translations: {
    type: Map,
    of: String,
    required: true
  }
});

export const TranslationModel =
  models.Translation || model<TranslationDocument>('Translation', translationSchema);
