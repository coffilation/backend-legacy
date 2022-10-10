import { MigrationInterface, QueryRunner } from "typeorm";

export class generated1665429820749 implements MigrationInterface {
    name = 'generated1665429820749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection" DROP CONSTRAINT "FK_6bc1666cf0d91b09dbf87b55704"`);
        await queryRunner.query(`ALTER TABLE "collection" ADD CONSTRAINT "FK_6bc1666cf0d91b09dbf87b55704" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection" DROP CONSTRAINT "FK_6bc1666cf0d91b09dbf87b55704"`);
        await queryRunner.query(`ALTER TABLE "collection" ADD CONSTRAINT "FK_6bc1666cf0d91b09dbf87b55704" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
