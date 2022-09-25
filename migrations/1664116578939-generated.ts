import { MigrationInterface, QueryRunner } from "typeorm";

export class generated1664116578939 implements MigrationInterface {
    name = 'generated1664116578939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "place" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "osmId" bigint NOT NULL, CONSTRAINT "UQ_6890a760e2f581e2b9215df9b6f" UNIQUE ("osmId"), CONSTRAINT "PK_96ab91d43aa89c5de1b59ee7cca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."collection_type_enum" AS ENUM('PUBLIC', 'PRIVATE')`);
        await queryRunner.query(`CREATE TABLE "collection" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "authorId" integer NOT NULL, "type" "public"."collection_type_enum" NOT NULL DEFAULT 'PRIVATE', CONSTRAINT "PK_ad3f485bbc99d875491f44d7c85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_collection_role_enum" AS ENUM('OWNER', 'ADMIN', 'EDITOR', 'MEMBER')`);
        await queryRunner.query(`CREATE TABLE "user_collection" ("userId" integer NOT NULL, "collectionId" integer NOT NULL, "role" "public"."user_collection_role_enum" NOT NULL DEFAULT 'MEMBER', CONSTRAINT "PK_b1f20997ec9157ba32bc2740fdd" PRIMARY KEY ("userId", "collectionId"))`);
        await queryRunner.query(`CREATE TABLE "review" ("id" integer NOT NULL, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "collection_places_place" ("collectionId" integer NOT NULL, "placeId" integer NOT NULL, CONSTRAINT "PK_65ce529a4ff0ae5f606b460d9b8" PRIMARY KEY ("collectionId", "placeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cbe29f270417d94a069d7794a8" ON "collection_places_place" ("collectionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5d566194b77c77c01b98c4cd51" ON "collection_places_place" ("placeId") `);
        await queryRunner.query(`ALTER TABLE "collection" ADD CONSTRAINT "FK_6bc1666cf0d91b09dbf87b55704" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_collection" ADD CONSTRAINT "FK_ea2e8bed8ef935e94917b71d220" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_collection" ADD CONSTRAINT "FK_191c291af8c86d883e9a302e7c9" FOREIGN KEY ("collectionId") REFERENCES "collection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collection_places_place" ADD CONSTRAINT "FK_cbe29f270417d94a069d7794a8b" FOREIGN KEY ("collectionId") REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "collection_places_place" ADD CONSTRAINT "FK_5d566194b77c77c01b98c4cd515" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection_places_place" DROP CONSTRAINT "FK_5d566194b77c77c01b98c4cd515"`);
        await queryRunner.query(`ALTER TABLE "collection_places_place" DROP CONSTRAINT "FK_cbe29f270417d94a069d7794a8b"`);
        await queryRunner.query(`ALTER TABLE "user_collection" DROP CONSTRAINT "FK_191c291af8c86d883e9a302e7c9"`);
        await queryRunner.query(`ALTER TABLE "user_collection" DROP CONSTRAINT "FK_ea2e8bed8ef935e94917b71d220"`);
        await queryRunner.query(`ALTER TABLE "collection" DROP CONSTRAINT "FK_6bc1666cf0d91b09dbf87b55704"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5d566194b77c77c01b98c4cd51"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cbe29f270417d94a069d7794a8"`);
        await queryRunner.query(`DROP TABLE "collection_places_place"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TABLE "user_collection"`);
        await queryRunner.query(`DROP TYPE "public"."user_collection_role_enum"`);
        await queryRunner.query(`DROP TABLE "collection"`);
        await queryRunner.query(`DROP TYPE "public"."collection_type_enum"`);
        await queryRunner.query(`DROP TABLE "place"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
