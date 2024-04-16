import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  PrimaryColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity({ name: 'products' })
export class ProductEntity extends BaseEntity {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'price' })
  price: number;

  @Column({ name: 'mainImage' })
  mainImage: string;

  @Column({ name: 'createdAt' })
  createdAt: Date;

  @Column({ name: 'updatedAt', nullable: true })
  updatedAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

}
