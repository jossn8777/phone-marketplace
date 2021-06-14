import { PreconditionFailedException } from '@nestjs/common';
import { IPagination } from 'src/common/interfaces';
import { ERROR_CODE, PHONE } from 'src/constants';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { Phone, Provider } from '../entities';

@EntityRepository(Phone)
export class PhoneRepository extends Repository<Phone> {
  async findById(id: number, user: Provider): Promise<Phone> {
    const where = {} as Phone;

    where.createdBy = user?.id;

    const existeds = await this.findByIds([id], {
      where,
    });

    if (!existeds?.length) {
      throw new PreconditionFailedException(ERROR_CODE.PHONE_NOT_FOUND);
    }

    return existeds[0];
  }

  async getById(id: number): Promise<Phone> {
    const existeds = await this.findByIds([id]);

    if (!existeds?.length) {
      throw new PreconditionFailedException(ERROR_CODE.PHONE_NOT_FOUND);
    }

    return existeds[0];
  }

  injectFilter(qb: SelectQueryBuilder<Phone>, filter?: any): void {
    if (filter?.statuses?.length) {
      qb.andWhere('phone.status IN (:...statuses)', {
        statuses: filter.statuses,
      });
    }
  }

  async search(pagination: IPagination): Promise<Phone[]> {
    const qb = this.createQueryBuilder('phone')
      .where('1 = 1')
      .andWhere('phone.status = :status', { status: PHONE.STATUS.ACTIVE });

    this.injectFilter(qb, pagination?.filter);

    qb.select('phone').leftJoinAndSelect('phone.provider', 'provider');
    if (pagination?.offset) {
      qb.skip(pagination.offset);
    }

    if (pagination?.limit) {
      qb.take(pagination.limit);
    }

    if (pagination?.sort) {
      qb.orderBy(`phone.${pagination.sort.field}`, pagination.sort.order);
    }

    // const test = await qb.getRawMany();

    // console.log(test);

    return await qb.getMany();
  }

  async countFilter(pagination: IPagination): Promise<number> {
    const qb = this.createQueryBuilder('phone')
      .where('1 = 1')
      .andWhere('phone.status = :status', { status: PHONE.STATUS.ACTIVE });

    this.injectFilter(qb, pagination?.filter);

    qb.select('phone').leftJoinAndSelect('phone.provider', 'provider');
    return await qb.getCount();
  }
}
