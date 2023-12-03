import { Schema, model, models } from 'mongoose';
import { LanguageDocument } from '@/types';

const languageSchema = new Schema<LanguageDocument>({
  code: {
    type: String,
    required: true
  },
  targetWebsiteId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  isDefault: {
    type: Boolean,
    default: false
  }
});

languageSchema.index(
  { targetWebsiteId: 1, isDefault: 1 },
  { unique: true, partialFilterExpression: { isDefault: true } }
);

const LanguageModel = models.Language || model<LanguageDocument>('Language', languageSchema);

export default LanguageModel;
