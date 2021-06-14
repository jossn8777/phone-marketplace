import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Phone, Provider } from '../entities';
import * as modelsJson from './phones.json';

export default class CreateModels implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const metaData = {
      status: 1,
      createdBy: 1,
    };
    const models = modelsJson.map((m) => ({
      ...metaData,
      ...m,
    })) as any[];

    await connection
      .createQueryBuilder()
      .insert()
      .into(Phone)
      .values(models)
      .execute();
  }
}
