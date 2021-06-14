import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Provider } from '../entities';
import { USER } from '../constants';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // return;
    await connection
      .createQueryBuilder()
      .insert()
      .into(Provider)
      .values([
        {
          username: 'agile',
          passwordHash: bcrypt.hashSync('12345678', 10),
        },
      ])
      .execute();
  }
}
