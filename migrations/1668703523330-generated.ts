import { MigrationInterface, QueryRunner } from "typeorm";

export class generated1668703523330 implements MigrationInterface {
    name = 'generated1668703523330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection" ADD "gradient" json`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection" DROP COLUMN "gradient"`);
    }

}
