import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, getSchemaPath } from '@nestjs/swagger';
import { Paginate } from 'src/utils';

export interface IApiPagination {
  defaultSize?: number;
  maxSize?: number;
  searchFields?: string[];
  filterFields?: any;
  sortFields?: string[];
  defaultSort?: { field: string; order: 'ASC' | 'DESC' };
  defaultOffset?: number;
  count?: boolean;
}

export const ApiPagination = (options: IApiPagination = {}): any => (
  target: any,
  propertyKey: any,
  descriptor: any,
) => {
  const {
    defaultSize = 10,
    maxSize = 30,
    searchFields,
    filterFields,
    sortFields,
    defaultSort = { field: 'id', order: 'DESC' },
    defaultOffset = 0,
    count = false,
  } = options;

  if (!count) {
    ApiQuery({
      name: 'size',
      type: 'number',
      description: `(Default: ${defaultSize} - Max: ${maxSize})`,
    })(target, propertyKey, descriptor);

    ApiQuery({
      name: 'offset',
      type: 'number',
      description: `(Default: ${defaultOffset})`,
    })(target, propertyKey, descriptor);

    ApiQuery({
      name: 'sort',
      type: 'string',
      required: false,
      description:
        sortFields && sortFields.length
          ? `Sort by: ${sortFields.join(', ')} (Default: Sort ${
              defaultSort.order === 'DESC' ? 'DESC' : 'ASC'
            } by ${defaultSort.field}) - Example: { "${
              sortFields[0]
            }": "DESC" }`
          : '',
    })(target, propertyKey, descriptor);
  }

  ApiQuery({
    name: 'keyword',
    type: 'string',
    required: false,
    description:
      searchFields && searchFields.length
        ? `Search by: ${searchFields.join(' or ')} - Example: abcxyz`
        : '',
  })(target, propertyKey, descriptor);

  if (filterFields) {
    ApiQuery({
      name: 'filter',
      type: 'string',
      required: false,
      description: `Filter by: ${JSON.stringify(filterFields)}`,
    })(target, propertyKey, descriptor);
  }
};

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(Paginate) },
          {
            properties: {
              items: {
                type: 'array',
                items: { type: 'object' },
                // items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
