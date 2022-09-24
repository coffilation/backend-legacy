import { MigrationInterface, QueryRunner } from "typeorm";

export class generated1663179508336 implements MigrationInterface {
    name = 'generated1663179508336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_collection_role_enum" AS ENUM('OWNER', 'ADMIN', 'EDITOR', 'MEMBER')`);
        await queryRunner.query(`CREATE TABLE "user_collection" ("userId" integer NOT NULL, "collectionId" integer NOT NULL, "role" "public"."user_collection_role_enum" NOT NULL DEFAULT 'MEMBER', CONSTRAINT "PK_b1f20997ec9157ba32bc2740fdd" PRIMARY KEY ("userId", "collectionId"))`);
        await queryRunner.query(`CREATE TYPE "public"."collection_type_enum" AS ENUM('PUBLIC', 'PRIVATE')`);
        await queryRunner.query(`ALTER TABLE "collection" ADD "type" "public"."collection_type_enum" NOT NULL DEFAULT 'PRIVATE'`);
        await queryRunner.query(`ALTER TABLE "user_collection" ADD CONSTRAINT "FK_ea2e8bed8ef935e94917b71d220" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_collection" ADD CONSTRAINT "FK_191c291af8c86d883e9a302e7c9" FOREIGN KEY ("collectionId") REFERENCES "collection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_collection" DROP CONSTRAINT "FK_191c291af8c86d883e9a302e7c9"`);
        await queryRunner.query(`ALTER TABLE "user_collection" DROP CONSTRAINT "FK_ea2e8bed8ef935e94917b71d220"`);
        await queryRunner.query(`ALTER TABLE "collection" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."collection_type_enum"`);
        await queryRunner.query(`DROP TABLE "user_collection"`);
        await queryRunner.query(`DROP TYPE "public"."user_collection_role_enum"`);
    }

}
