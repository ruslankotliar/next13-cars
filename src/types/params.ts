type Params = {
  lang?: string;
  country?: string;
  carId?: string;
};

type SearchParams = {
  make?: string;
  model?: string;
  year?: string;
  color?: string;
  price?: string;
};

export type { Params, SearchParams };
