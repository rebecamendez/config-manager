import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateConfigurationsTable1697978360239 implements MigrationInterface {
  name = 'CreateConfigurationsTable1697978360239';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "configuration" ("name" character varying(256) NOT NULL, "value" character varying(1000) NOT NULL, CONSTRAINT "PK_28ac27674364374c342e83cba9d" PRIMARY KEY ("name"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "configuration"`);
  }
}
