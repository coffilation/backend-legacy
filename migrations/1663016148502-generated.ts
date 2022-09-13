import { MigrationInterface, QueryRunner } from "typeorm";

export class generated1663016148502 implements MigrationInterface {
    name = 'generated1663016148502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "review" ("id" integer NOT NULL, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "review"`);
    }

}
