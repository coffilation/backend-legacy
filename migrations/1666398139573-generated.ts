import { MigrationInterface, QueryRunner } from "typeorm";

export class generated1666398139573 implements MigrationInterface {
    name = 'generated1666398139573'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "place" ADD "osmType" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "place" ADD "displayName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "place" ADD "category" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "place" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "place" ADD "address" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "place" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "place" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "place" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "place" DROP COLUMN "displayName"`);
        await queryRunner.query(`ALTER TABLE "place" DROP COLUMN "osmType"`);
    }

}
