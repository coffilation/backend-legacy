import { MigrationInterface, QueryRunner } from "typeorm";

export class generated1665776186292 implements MigrationInterface {
    name = 'generated1665776186292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection" DROP CONSTRAINT "FK_6bc1666cf0d91b09dbf87b55704"`);
        await queryRunner.query(`CREATE TABLE "place_collection" ("placeOsmId" bigint NOT NULL, "collectionId" integer NOT NULL, CONSTRAINT "PK_920c0ff4423ef33ad6c5fa2e323" PRIMARY KEY ("placeOsmId", "collectionId"))`);
        await queryRunner.query(`ALTER TABLE "place_collection" ADD CONSTRAINT "FK_087060084f949eaf579051be40a" FOREIGN KEY ("placeOsmId") REFERENCES "place"("osmId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "place_collection" ADD CONSTRAINT "FK_ddbceed5861709f2c7d2eec5c62" FOREIGN KEY ("collectionId") REFERENCES "collection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collection" ADD CONSTRAINT "FK_6bc1666cf0d91b09dbf87b55704" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection" DROP CONSTRAINT "FK_6bc1666cf0d91b09dbf87b55704"`);
        await queryRunner.query(`ALTER TABLE "place_collection" DROP CONSTRAINT "FK_ddbceed5861709f2c7d2eec5c62"`);
        await queryRunner.query(`ALTER TABLE "place_collection" DROP CONSTRAINT "FK_087060084f949eaf579051be40a"`);
        await queryRunner.query(`DROP TABLE "place_collection"`);
        await queryRunner.query(`ALTER TABLE "collection" ADD CONSTRAINT "FK_6bc1666cf0d91b09dbf87b55704" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
