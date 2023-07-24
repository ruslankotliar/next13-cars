import { params } from '@/constants';

export const generateFilters = (searchParams: URLSearchParams) => {
  let filters = params.reduce((acc, param) => {
    const val = searchParams.get(param);

    return val ? { ...acc, [param]: val } : acc;
  }, {});

  return filters;
};
