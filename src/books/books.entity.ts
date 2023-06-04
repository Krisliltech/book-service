import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'book_service' })
export class BookEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true})
  title: string;

  @Column()
  author: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: string;
}
