import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameImageToImageUrlInMenuTable1681999999999 implements MigrationInterface {
  name = 'RenameImageToImageUrlInMenuTable1681999999999';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "menu" RENAME COLUMN "image" TO "imageUrl"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "menu" RENAME COLUMN "imageUrl" TO "image"
    `);
  }
}
