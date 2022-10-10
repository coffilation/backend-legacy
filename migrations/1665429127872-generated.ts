import { MigrationInterface, QueryRunner } from "typeorm";

export class generated1665429127872 implements MigrationInterface {
    name = 'generated1665429127872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_collection" DROP CONSTRAINT "FK_191c291af8c86d883e9a302e7c9"`);
        await queryRunner.query(`ALTER TABLE "user_collection" ADD CONSTRAINT "FK_191c291af8c86d883e9a302e7c9" FOREIGN KEY ("collectionId") REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_collection" DROP CONSTRAINT "FK_191c291af8c86d883e9a302e7c9"`);
        await queryRunner.query(`ALTER TABLE "user_collection" ADD CONSTRAINT "FK_191c291af8c86d883e9a302e7c9" FOREIGN KEY ("collectionId") REFERENCES "collection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
