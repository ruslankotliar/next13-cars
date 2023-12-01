import { Schema, model, models } from 'mongoose';

import { TranslationDocument } from '@/types';

const translationSchema = new Schema<TranslationDocument>({
  key: {
    type: String,
    required: true
  },
  targetWebsiteId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  translations: {
    type: Map,
    of: String,
    required: true
  }
});

const TranslationModel =
  models.Translation || model<TranslationDocument>('Translation', translationSchema);
export default TranslationModel;
