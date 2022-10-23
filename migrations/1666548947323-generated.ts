import { MigrationInterface, QueryRunner } from "typeorm";

export class generated1666548947323 implements MigrationInterface {
    name = 'generated1666548947323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."invite_role_enum" AS ENUM('OWNER', 'ADMIN', 'EDITOR', 'MEMBER')`);
        await queryRunner.query(`CREATE TABLE "invite" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "collectionId" integer NOT NULL, "role" "public"."invite_role_enum" NOT NULL, CONSTRAINT "PK_de11882defd61dc13f5c77482c2" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`ALTER TABLE "invite" ADD CONSTRAINT "FK_14f9df2d588b636e296326af2a5" FOREIGN KEY ("collectionId") REFERENCES "collection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invite" DROP CONSTRAINT "FK_14f9df2d588b636e296326af2a5"`);
        await queryRunner.query(`DROP TABLE "invite"`);
        await queryRunner.query(`DROP TYPE "public"."invite_role_enum"`);
    }

}
