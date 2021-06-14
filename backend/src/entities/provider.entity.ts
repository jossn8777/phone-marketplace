import {
  BeforeInsert,
  BeforeUpdate,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import {
  ColumnPrimaryKey,
  Column32Char,
  Column255Char,
  ColumnTinyInt,
  Column64Char,
  CreatedAt,
  UpdatedAt,
  ColumnNChar,
  ColumnBigInt,
  ColumnJson,
} from '../utils';
import { Exclude, Expose } from 'class-transformer';
import { Phone } from './phone.entity';

@Entity('Provider')
export class Provider {
  @ColumnPrimaryKey()
  id: number;

  @Column32Char()
  @Index('username')
  username: string;

  @Column255Char()
  // @Expose({ groups: ['GROUP_USER'] })
  @Exclude()
  passwordHash: string;

  @CreatedAt()
  createdAt: Date;

  @UpdatedAt()
  updatedAt: Date;

  @BeforeInsert()
  setNewPassword(): void {
    this.passwordHash = this?.passwordHash
      ? bcrypt.hashSync(this.passwordHash, 10)
      : null;
  }

  @BeforeUpdate()
  setUpdatedDate(): void {
    this.updatedAt = new Date();
  }

  @OneToMany(() => Phone, (x) => x.provider, {
    createForeignKeyConstraints: false,
  })
  phones: Phone[];
}
