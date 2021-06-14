import {
  BeforeUpdate,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import {
  ColumnPrimaryKey,
  Column32Char,
  DateAt,
  ColumnTinyInt,
  Column64Char,
  CreatedAt,
  UpdatedAt,
  ColumnNChar,
  ColumnInt,
  ColumnBigInt,
} from '../utils';
import { Provider } from './provider.entity';

@Entity('Phone')
export class Phone {
  @ColumnPrimaryKey()
  id: number;

  @Column64Char()
  name: string;

  @ColumnNChar(512)
  description: string;

  @Column64Char()
  manufacturer: string;

  @Column64Char()
  color: string;

  @ColumnBigInt()
  price: number;

  @ColumnNChar(512)
  picture: string;

  @Column64Char()
  screen: string;

  @Column64Char()
  processor: string;

  @Column64Char()
  ram: string;

  @ColumnTinyInt({ default: 1 })
  status: number;

  @ColumnBigInt()
  createdBy: number;

  @CreatedAt()
  createdAt: Date;

  @UpdatedAt()
  updatedAt: Date;

  @BeforeUpdate()
  setUpdatedDate(): void {
    this.updatedAt = new Date();
  }

  @ManyToOne(() => Provider, (p) => p.phones, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'createdBy' })
  provider?: Provider;
}
