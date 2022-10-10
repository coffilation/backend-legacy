import { MigrationInterface, QueryRunner } from "typeorm";

export class generated1665429846842 implements MigrationInterface {
    name = 'generated1665429846842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_collection" DROP CONSTRAINT "FK_ea2e8bed8ef935e94917b71d220"`);
        await queryRunner.query(`ALTER TABLE "user_collection" ADD CONSTRAINT "FK_ea2e8bed8ef935e94917b71d220" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_collection" DROP CONSTRAINT "FK_ea2e8bed8ef935e94917b71d220"`);
        await queryRunner.query(`ALTER TABLE "user_collection" ADD CONSTRAINT "FK_ea2e8bed8ef935e94917b71d220" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
