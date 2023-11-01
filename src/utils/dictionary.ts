const getTranslator = async (dictionary: Record<string, string>) => {
  return (key: string, params?: { [key: string]: string | number }) => {
    let translation = dictionary[key];

    if (!translation) {
      return key;
    }
    if (params && Object.entries(params).length) {
      Object.entries(params).forEach(([key, value]) => {
        translation = translation!.replace(`{{ ${key} }}`, String(value));
      });
    }
    return translation;
  };
};

export { getTranslator };
