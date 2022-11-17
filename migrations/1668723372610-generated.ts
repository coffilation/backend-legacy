import { MigrationInterface, QueryRunner } from "typeorm";

export class generated1668723372610 implements MigrationInterface {
    name = 'generated1668723372610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "place" DROP CONSTRAINT "UQ_5800eb06bec41c0613cc4d5ef6d"`);
        await queryRunner.query(`ALTER TABLE "place" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "place_id_seq"`);
        await queryRunner.query(`ALTER TABLE "place" DROP CONSTRAINT "UQ_6890a760e2f581e2b9215df9b6f"`);
        await queryRunner.query(`ALTER TABLE "place" ADD CONSTRAINT "UQ_5800eb06bec41c0613cc4d5ef6d" UNIQUE ("osmId", "osmType", "category")`);
        await queryRunner.query(`ALTER TABLE "place_collection" ADD CONSTRAINT "FK_c5235c005a0c30980d0a86cee07" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_ec8f295224c904bded4ddfd9ec6" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_ec8f295224c904bded4ddfd9ec6"`);
        await queryRunner.query(`ALTER TABLE "place_collection" DROP CONSTRAINT "FK_c5235c005a0c30980d0a86cee07"`);
        await queryRunner.query(`ALTER TABLE "place" DROP CONSTRAINT "UQ_5800eb06bec41c0613cc4d5ef6d"`);
        await queryRunner.query(`ALTER TABLE "place" ADD CONSTRAINT "UQ_6890a760e2f581e2b9215df9b6f" UNIQUE ("osmId")`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "place_id_seq" OWNED BY "place"."id"`);
        await queryRunner.query(`ALTER TABLE "place" ALTER COLUMN "id" SET DEFAULT nextval('"place_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "place" ADD CONSTRAINT "UQ_5800eb06bec41c0613cc4d5ef6d" UNIQUE ("osmId", "osmType", "category")`);
    }

}
