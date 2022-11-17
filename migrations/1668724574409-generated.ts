import { MigrationInterface, QueryRunner } from "typeorm";

export class generated1668724574409 implements MigrationInterface {
    name = 'generated1668724574409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "place" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "place" ADD "address" json NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "place" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "place" ADD "address" text NOT NULL`);
    }

}
