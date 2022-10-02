import { MigrationInterface, QueryRunner } from "typeorm";

export class generated1664720310518 implements MigrationInterface {
    name = 'generated1664720310518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection_places_place" DROP CONSTRAINT "FK_5d566194b77c77c01b98c4cd515"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5d566194b77c77c01b98c4cd51"`);
        await queryRunner.query(`ALTER TABLE "collection_places_place" RENAME COLUMN "placeId" TO "placeOsmId"`);
        await queryRunner.query(`ALTER TABLE "collection_places_place" RENAME CONSTRAINT "PK_65ce529a4ff0ae5f606b460d9b8" TO "PK_1b7e7b07be1a133190986886e42"`);
        await queryRunner.query(`ALTER TABLE "place" DROP CONSTRAINT "PK_96ab91d43aa89c5de1b59ee7cca"`);
        await queryRunner.query(`ALTER TABLE "place" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "place" ADD CONSTRAINT "PK_6890a760e2f581e2b9215df9b6f" PRIMARY KEY ("osmId")`);
        await queryRunner.query(`ALTER TABLE "place" DROP CONSTRAINT "UQ_6890a760e2f581e2b9215df9b6f"`);
        await queryRunner.query(`ALTER TABLE "collection_places_place" DROP CONSTRAINT "PK_1b7e7b07be1a133190986886e42"`);
        await queryRunner.query(`ALTER TABLE "collection_places_place" ADD CONSTRAINT "PK_cbe29f270417d94a069d7794a8b" PRIMARY KEY ("collectionId")`);
        await queryRunner.query(`ALTER TABLE "collection_places_place" DROP COLUMN "placeOsmId"`);
        await queryRunner.query(`ALTER TABLE "collection_places_place" ADD "placeOsmId" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "collection_places_place" DROP CONSTRAINT "PK_cbe29f270417d94a069d7794a8b"`);
        await queryRunner.query(`ALTER TABLE "collection_places_place" ADD CONSTRAINT "PK_1b7e7b07be1a133190986886e42" PRIMARY KEY ("collectionId", "placeOsmId")`);
        await queryRunner.query(`CREATE INDEX "IDX_2391f59652fbec95fe35265591" ON "collection_places_place" ("placeOsmId") `);
        await queryRunner.query(`ALTER TABLE "collection_places_place" ADD CONSTRAINT "FK_2391f59652fbec95fe35265591c" FOREIGN KEY ("placeOsmId") REFERENCES "place"("osmId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection_places_place" DROP CONSTRAINT "FK_2391f59652fbec95fe35265591c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2391f59652fbec95fe35265591"`);
        await queryRunner.query(`ALTER TABLE "collection_places_place" DROP CONSTRAINT "PK_1b7e7b07be1a133190986886e42"`);
        await queryRunner.query(`ALTER TABLE "collection_places_place" ADD CONSTRAINT "PK_cbe29f270417d94a069d7794a8b" PRIMARY KEY ("collectionId")`);
        await queryRunner.query(`ALTER TABLE "collection_places_place" DROP COLUMN "placeOsmId"`);
        await queryRunner.query(`ALTER TABLE "collection_places_place" ADD "placeOsmId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "collection_places_place" DROP CONSTRAINT "PK_cbe29f270417d94a069d7794a8b"`);
        await queryRunner.query(`ALTER TABLE "collection_places_place" ADD CONSTRAINT "PK_1b7e7b07be1a133190986886e42" PRIMARY KEY ("collectionId", "placeOsmId")`);
        await queryRunner.query(`ALTER TABLE "place" ADD CONSTRAINT "UQ_6890a760e2f581e2b9215df9b6f" UNIQUE ("osmId")`);
        await queryRunner.query(`ALTER TABLE "place" DROP CONSTRAINT "PK_6890a760e2f581e2b9215df9b6f"`);
        await queryRunner.query(`ALTER TABLE "place" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "place" ADD CONSTRAINT "PK_96ab91d43aa89c5de1b59ee7cca" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "collection_places_place" RENAME CONSTRAINT "PK_1b7e7b07be1a133190986886e42" TO "PK_65ce529a4ff0ae5f606b460d9b8"`);
        await queryRunner.query(`ALTER TABLE "collection_places_place" RENAME COLUMN "placeOsmId" TO "placeId"`);
        await queryRunner.query(`CREATE INDEX "IDX_5d566194b77c77c01b98c4cd51" ON "collection_places_place" ("placeId") `);
        await queryRunner.query(`ALTER TABLE "collection_places_place" ADD CONSTRAINT "FK_5d566194b77c77c01b98c4cd515" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
