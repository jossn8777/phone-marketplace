import _ = require('lodash');
import { Response, NextFunction } from 'express';
import { IApiPagination } from '../decorators';

export const PaginationMiddleware = (config: IApiPagination) => (
  req: any,
  res: Response,
  next: NextFunction,
): void => {
  const defaultConfig = {
    defaultSize: 10,
    maxSize: 30,
    filterFields: [],
    offset: 0,
  };
  const {
    defaultSize,
    maxSize,
    filterFields,
    sortFields,
    defaultSort,
    defaultOffset,
  } = {
    ...defaultConfig,
    ...config,
  };

  const pagination: any = {};

  const size = req.query.size || defaultSize;
  pagination.limit = Math.min(size, maxSize);

  const offset = parseInt(req.query.offset || 0);

  pagination.offset = offset || defaultOffset || 0;

  if (req.query.keyword) {
    pagination.keyword = req.query?.keyword || null;
  }

  try {
    const filter = JSON.parse(req.query?.filter);
    pagination.filter = _.pick(filter, filterFields);
  } catch (error) {}

  try {
    if (!req.query?.sort) {
      pagination.sort = defaultSort;

      req.pagination = pagination;
      next();

      return;
    }

    let sort = JSON.parse(req.query?.sort);

    const sorts = Object.keys(sort).map((key) => {
      return {
        field: key,
        order: sort[key],
      };
    });

    sort = sorts?.[0];

    if (
      sort &&
      sortFields.includes(sort.field) &&
      ['ASC', 'DESC'].includes(sort.order)
    ) {
      pagination.sort = sort;
    } else {
      pagination.sort = defaultSort;
    }

    req.pagination = pagination;
    next();
  } catch (error) {
    pagination.sort = defaultSort;

    req.pagination = pagination;
    next();
  }
};
