interface Language {
  code: string;
  targetWebsiteId: string;
  name: string;
}

interface LanguageDocument extends Document, Language {}

export type { Language, LanguageDocument };
