import { MigrationInterface, QueryRunner } from "typeorm";

export class generated1668722327334 implements MigrationInterface {
    name = 'generated1668722327334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "place_collection" DROP CONSTRAINT "FK_087060084f949eaf579051be40a"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_15152ca3ba30d679af4d370e8a8"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "UQ_960a5ff36ac979ab1feb74ac6ef"`);
        await queryRunner.query(`ALTER TABLE "place_collection" RENAME COLUMN "placeOsmId" TO "placeId"`);
        await queryRunner.query(`ALTER TABLE "place_collection" RENAME CONSTRAINT "PK_920c0ff4423ef33ad6c5fa2e323" TO "PK_7e344935b63ea4d7309ccf10754"`);
        await queryRunner.query(`ALTER TABLE "review" RENAME COLUMN "placeOsmId" TO "placeId"`);
        await queryRunner.query(`ALTER TABLE "place" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "place" ADD CONSTRAINT "UQ_96ab91d43aa89c5de1b59ee7cca" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "place_collection" DROP CONSTRAINT "PK_7e344935b63ea4d7309ccf10754"`);
        await queryRunner.query(`ALTER TABLE "place_collection" ADD CONSTRAINT "PK_ddbceed5861709f2c7d2eec5c62" PRIMARY KEY ("collectionId")`);
        await queryRunner.query(`ALTER TABLE "place_collection" DROP COLUMN "placeId"`);
        await queryRunner.query(`ALTER TABLE "place_collection" ADD "placeId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "place_collection" DROP CONSTRAINT "PK_ddbceed5861709f2c7d2eec5c62"`);
        await queryRunner.query(`ALTER TABLE "place_collection" ADD CONSTRAINT "PK_7e344935b63ea4d7309ccf10754" PRIMARY KEY ("collectionId", "placeId")`);
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "placeId"`);
        await queryRunner.query(`ALTER TABLE "review" ADD "placeId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "place" ADD CONSTRAINT "UQ_5800eb06bec41c0613cc4d5ef6d" UNIQUE ("osmId", "osmType", "category")`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "UQ_d3a4e210a8221b6b71f09510ee3" UNIQUE ("authorId", "placeId")`);
        await queryRunner.query(`ALTER TABLE "place_collection" ADD CONSTRAINT "FK_c5235c005a0c30980d0a86cee07" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_ec8f295224c904bded4ddfd9ec6" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_ec8f295224c904bded4ddfd9ec6"`);
        await queryRunner.query(`ALTER TABLE "place_collection" DROP CONSTRAINT "FK_c5235c005a0c30980d0a86cee07"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "UQ_d3a4e210a8221b6b71f09510ee3"`);
        await queryRunner.query(`ALTER TABLE "place" DROP CONSTRAINT "UQ_5800eb06bec41c0613cc4d5ef6d"`);
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "placeId"`);
        await queryRunner.query(`ALTER TABLE "review" ADD "placeId" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "place_collection" DROP CONSTRAINT "PK_7e344935b63ea4d7309ccf10754"`);
        await queryRunner.query(`ALTER TABLE "place_collection" ADD CONSTRAINT "PK_ddbceed5861709f2c7d2eec5c62" PRIMARY KEY ("collectionId")`);
        await queryRunner.query(`ALTER TABLE "place_collection" DROP COLUMN "placeId"`);
        await queryRunner.query(`ALTER TABLE "place_collection" ADD "placeId" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "place_collection" DROP CONSTRAINT "PK_ddbceed5861709f2c7d2eec5c62"`);
        await queryRunner.query(`ALTER TABLE "place_collection" ADD CONSTRAINT "PK_7e344935b63ea4d7309ccf10754" PRIMARY KEY ("placeId", "collectionId")`);
        await queryRunner.query(`ALTER TABLE "place" DROP CONSTRAINT "UQ_96ab91d43aa89c5de1b59ee7cca"`);
        await queryRunner.query(`ALTER TABLE "place" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "review" RENAME COLUMN "placeId" TO "placeOsmId"`);
        await queryRunner.query(`ALTER TABLE "place_collection" RENAME CONSTRAINT "PK_7e344935b63ea4d7309ccf10754" TO "PK_920c0ff4423ef33ad6c5fa2e323"`);
        await queryRunner.query(`ALTER TABLE "place_collection" RENAME COLUMN "placeId" TO "placeOsmId"`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "UQ_960a5ff36ac979ab1feb74ac6ef" UNIQUE ("authorId", "placeOsmId")`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_15152ca3ba30d679af4d370e8a8" FOREIGN KEY ("placeOsmId") REFERENCES "place"("osmId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "place_collection" ADD CONSTRAINT "FK_087060084f949eaf579051be40a" FOREIGN KEY ("placeOsmId") REFERENCES "place"("osmId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
