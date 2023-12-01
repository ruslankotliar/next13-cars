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
  }
});

const LanguageModel = models?.Language || model<LanguageDocument>('Language', languageSchema);

export default LanguageModel;
