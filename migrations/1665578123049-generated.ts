import { MigrationInterface, QueryRunner } from "typeorm";

export class generated1665578123049 implements MigrationInterface {
    name = 'generated1665578123049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" ADD "authorId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "review" ADD "rating" real NOT NULL`);
        await queryRunner.query(`ALTER TABLE "review" ADD "description" character varying(1024)`);
        await queryRunner.query(`ALTER TABLE "review" ADD "placeId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "review" ADD "placeOsmId" bigint`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "review_id_seq" OWNED BY "review"."id"`);
        await queryRunner.query(`ALTER TABLE "review" ALTER COLUMN "id" SET DEFAULT nextval('"review_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "UQ_d3a4e210a8221b6b71f09510ee3" UNIQUE ("authorId", "placeId")`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_1e758e3895b930ccf269f30c415" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_15152ca3ba30d679af4d370e8a8" FOREIGN KEY ("placeOsmId") REFERENCES "place"("osmId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_15152ca3ba30d679af4d370e8a8"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_1e758e3895b930ccf269f30c415"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "UQ_d3a4e210a8221b6b71f09510ee3"`);
        await queryRunner.query(`ALTER TABLE "review" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "review_id_seq"`);
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "placeOsmId"`);
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "placeId"`);
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "authorId"`);
    }

}
