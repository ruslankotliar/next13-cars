interface Language {
  code: string;
  name: string;
}

interface LanguageDocument extends Document, Language {}

export type { Language, LanguageDocument };
