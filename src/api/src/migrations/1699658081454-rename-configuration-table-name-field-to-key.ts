import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameConfigurationTableNameFieldToKey1699658081454 implements MigrationInterface {
  name = 'RenameConfigurationTableNameFieldToKey1699658081454';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "configuration" RENAME COLUMN "name" TO "key"`);
    await queryRunner.query(
      `ALTER TABLE "configuration" RENAME CONSTRAINT "PK_28ac27674364374c342e83cba9d" TO "PK_36aa5305bb4de9034d272f6a244"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "configuration" RENAME CONSTRAINT "PK_36aa5305bb4de9034d272f6a244" TO "PK_28ac27674364374c342e83cba9d"`
    );
    await queryRunner.query(`ALTER TABLE "configuration" RENAME COLUMN "key" TO "name"`);
  }
}
