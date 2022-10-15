import { MigrationInterface, QueryRunner } from "typeorm";

export class generated1665789134513 implements MigrationInterface {
    name = 'generated1665789134513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "UQ_d3a4e210a8221b6b71f09510ee3"`);
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "placeId"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_15152ca3ba30d679af4d370e8a8"`);
        await queryRunner.query(`ALTER TABLE "review" ALTER COLUMN "placeOsmId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "UQ_960a5ff36ac979ab1feb74ac6ef" UNIQUE ("authorId", "placeOsmId")`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_15152ca3ba30d679af4d370e8a8" FOREIGN KEY ("placeOsmId") REFERENCES "place"("osmId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_15152ca3ba30d679af4d370e8a8"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "UQ_960a5ff36ac979ab1feb74ac6ef"`);
        await queryRunner.query(`ALTER TABLE "review" ALTER COLUMN "placeOsmId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_15152ca3ba30d679af4d370e8a8" FOREIGN KEY ("placeOsmId") REFERENCES "place"("osmId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD "placeId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "UQ_d3a4e210a8221b6b71f09510ee3" UNIQUE ("authorId", "placeId")`);
    }

}
