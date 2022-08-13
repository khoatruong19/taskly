import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialise1660370202642 implements MigrationInterface {
    name = 'Initialise1660370202642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "weekly_task" ("id" SERIAL NOT NULL, "title" character varying NOT NULL DEFAULT 'Untitled', "description" character varying NOT NULL DEFAULT '', "date" character varying NOT NULL, "time" character varying, "icon" character varying NOT NULL DEFAULT '⭐', "userId" uuid NOT NULL, CONSTRAINT "PK_d374a16e5457d95e73d3c2b19a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying NOT NULL DEFAULT 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile.png', "tokenVersion" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "day_task" ("id" SERIAL NOT NULL, "title" character varying NOT NULL DEFAULT 'Untitled', "description" character varying NOT NULL DEFAULT '', "userId" uuid NOT NULL, "time" TIMESTAMP NOT NULL, "date" character varying NOT NULL, "icon" character varying NOT NULL DEFAULT '⭐', "done" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_73dd6155fcc933eec2aff678d4f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "weekly_task" ADD CONSTRAINT "FK_86b09c5da8665304d5397d5f36c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "day_task" ADD CONSTRAINT "FK_d04a794e049d9e6ea3bb2314c06" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "day_task" DROP CONSTRAINT "FK_d04a794e049d9e6ea3bb2314c06"`);
        await queryRunner.query(`ALTER TABLE "weekly_task" DROP CONSTRAINT "FK_86b09c5da8665304d5397d5f36c"`);
        await queryRunner.query(`DROP TABLE "day_task"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "weekly_task"`);
    }

}
