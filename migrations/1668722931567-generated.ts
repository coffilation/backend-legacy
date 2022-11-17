import { MigrationInterface, QueryRunner } from "typeorm";

export class generated1668722931567 implements MigrationInterface {
    name = 'generated1668722931567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "place_collection" DROP CONSTRAINT "FK_c5235c005a0c30980d0a86cee07"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_ec8f295224c904bded4ddfd9ec6"`);
        await queryRunner.query(`ALTER TABLE "place" DROP CONSTRAINT "UQ_5800eb06bec41c0613cc4d5ef6d"`);
        await queryRunner.query(`ALTER TABLE "place" DROP CONSTRAINT "PK_6890a760e2f581e2b9215df9b6f" CASCADE`);
        await queryRunner.query(`ALTER TABLE "place_collection" ADD CONSTRAINT "FK_c5235c005a0c30980d0a86cee07" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_ec8f295224c904bded4ddfd9ec6" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "place" ADD CONSTRAINT "PK_39f128dde9467feccdb06dbcfdf" PRIMARY KEY ("osmId", "id")`);
        await queryRunner.query(`ALTER TABLE "place" DROP CONSTRAINT "UQ_96ab91d43aa89c5de1b59ee7cca" CASCADE`);
        await queryRunner.query(`ALTER TABLE "place" DROP CONSTRAINT "PK_39f128dde9467feccdb06dbcfdf"`);
        await queryRunner.query(`ALTER TABLE "place" ADD CONSTRAINT "PK_96ab91d43aa89c5de1b59ee7cca" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "place" ADD CONSTRAINT "UQ_6890a760e2f581e2b9215df9b6f" UNIQUE ("osmId")`);
        await queryRunner.query(`ALTER TABLE "place" ADD CONSTRAINT "UQ_5800eb06bec41c0613cc4d5ef6d" UNIQUE ("osmId", "osmType", "category")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_ec8f295224c904bded4ddfd9ec6"`);
        await queryRunner.query(`ALTER TABLE "place_collection" DROP CONSTRAINT "FK_c5235c005a0c30980d0a86cee07"`);
        await queryRunner.query(`ALTER TABLE "place" DROP CONSTRAINT "UQ_5800eb06bec41c0613cc4d5ef6d"`);
        await queryRunner.query(`ALTER TABLE "place" DROP CONSTRAINT "UQ_6890a760e2f581e2b9215df9b6f"`);
        await queryRunner.query(`ALTER TABLE "place" DROP CONSTRAINT "PK_96ab91d43aa89c5de1b59ee7cca"`);
        await queryRunner.query(`ALTER TABLE "place" ADD CONSTRAINT "PK_39f128dde9467feccdb06dbcfdf" PRIMARY KEY ("osmId", "id")`);
        await queryRunner.query(`ALTER TABLE "place" ADD CONSTRAINT "UQ_96ab91d43aa89c5de1b59ee7cca" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "place" DROP CONSTRAINT "PK_39f128dde9467feccdb06dbcfdf"`);
        await queryRunner.query(`ALTER TABLE "place" ADD CONSTRAINT "PK_6890a760e2f581e2b9215df9b6f" PRIMARY KEY ("osmId")`);
        await queryRunner.query(`ALTER TABLE "place" ADD CONSTRAINT "UQ_5800eb06bec41c0613cc4d5ef6d" UNIQUE ("osmId", "osmType", "category")`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_ec8f295224c904bded4ddfd9ec6" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "place_collection" ADD CONSTRAINT "FK_c5235c005a0c30980d0a86cee07" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
