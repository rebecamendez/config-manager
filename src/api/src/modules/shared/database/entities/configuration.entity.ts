import { Column, Entity } from 'typeorm';

@Entity('configuration')
export class ConfigurationEntity {
  @Column({ length: 256, type: 'varchar', primary: true })
  public key!: string;

  @Column({ length: 1000, type: 'varchar' })
  public value!: string;
}
