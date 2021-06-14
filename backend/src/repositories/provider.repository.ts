import { PreconditionFailedException } from '@nestjs/common';
import { IPagination } from 'src/common/interfaces';
import { ERROR_CODE } from 'src/constants';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { Provider } from '../entities';

@EntityRepository(Provider)
export class ProviderRepository extends Repository<Provider> {
  async getById(id: number): Promise<Provider> {
    const existeds = await this.findByIds([id]);

    if (!existeds?.length) {
      throw new PreconditionFailedException(ERROR_CODE.USER_NOT_FOUND);
    }

    return existeds[0];
  }

  injectFilter(qb: SelectQueryBuilder<Provider>, filter?: any): void {}

  async search(
    pagination: IPagination,
    cacheKey?: string,
  ): Promise<Provider[]> {
    const qb = this.createQueryBuilder('provider').where('1 = 1');

    this.injectFilter(qb, pagination?.filter);

    qb.select('provider');

    if (pagination?.offset) {
      qb.skip(pagination.offset);
    }

    if (pagination?.limit) {
      qb.take(pagination.limit);
    }

    if (pagination?.sort) {
      qb.orderBy(`provider.${pagination.sort.field}`, pagination.sort.order);
    }

    if (cacheKey) {
      qb.cache(cacheKey, 30000);
    }
    return await qb.getMany();
  }

  async countFilter(pagination: IPagination): Promise<number> {
    const qb = this.createQueryBuilder('provider').where('1 = 1');

    this.injectFilter(qb, pagination?.filter);

    qb.select('provider')
      .skip(pagination.offset)
      .take(pagination.limit)
      .orderBy(`provider.${pagination.sort.field}`, pagination.sort.order);
    return await qb.getCount();
  }
}
