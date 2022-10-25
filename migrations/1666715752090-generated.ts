import { MigrationInterface, QueryRunner } from "typeorm";

export class generated1666715752090 implements MigrationInterface {
    name = 'generated1666715752090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection" ADD "description" character varying(1024)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection" DROP COLUMN "description"`);
    }

}
