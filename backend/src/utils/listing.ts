import * as _ from 'lodash';

export const nested = (params: any) => {
  const data = _.reduce(
    params,
    (result: any, value: any, field: string) => {
      _.set(result, field, value);
      return result;
    },
    {},
  );

  return data;
};
