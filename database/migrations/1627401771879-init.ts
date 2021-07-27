import {MigrationInterface, QueryRunner} from "typeorm";

export class init1627401771879 implements MigrationInterface {
    name = 'init1627401771879'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "images" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" integer NOT NULL, "path" character varying NOT NULL, "isTmp" boolean NOT NULL, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "genre" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "animesId" integer, CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "figure" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" integer NOT NULL, "profileId" integer, "animeToTeamPostToCategoryId" integer, CONSTRAINT "PK_9b7e19001257bb3db43958e59da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "video_player" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_541f15438d5fb81ae2909b719f1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "episode_to_video_player" ("postToCategoryId" SERIAL NOT NULL, "episodeId" integer NOT NULL, "playerId" integer NOT NULL, "iframe" character varying NOT NULL, "videoPlayerId" integer, CONSTRAINT "PK_1bbfb191094b41d0590b05666e6" PRIMARY KEY ("postToCategoryId"))`);
        await queryRunner.query(`CREATE TABLE "episode" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "number_episode" integer NOT NULL, "animeToTeamPostToCategoryId" integer, CONSTRAINT "PK_7258b95d6d2bf7f621845a0e143" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "anime_to_team" ("postToCategoryId" SERIAL NOT NULL, "animeId" integer NOT NULL, "teamId" integer NOT NULL, CONSTRAINT "PK_524ff7583417d584581df0bfcf4" PRIMARY KEY ("postToCategoryId"))`);
        await queryRunner.query(`CREATE TABLE "team" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "key" character varying NOT NULL, "roles" text, "permissions" text NOT NULL, CONSTRAINT "UQ_a87cf0659c3ac379b339acf36a2" UNIQUE ("key"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "theme" integer NOT NULL DEFAULT '0', "tokenRefresh" character varying, "passwordHash" character varying, "roleId" integer, CONSTRAINT "my_unique_constraint" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "anime" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "name_other" text NOT NULL, "description" text NOT NULL, "current_count_episodes" integer NOT NULL, "count_episodes" integer NOT NULL, "duration" integer NOT NULL, "format" integer NOT NULL, "season" integer NOT NULL, "status" integer NOT NULL, "date_release" TIMESTAMP NOT NULL, "date_end" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "posterId" integer, "user_created_id" integer, CONSTRAINT "REL_5392a6fc82c834bfa7b7d6a383" UNIQUE ("posterId"), CONSTRAINT "REL_a6b577a6f7cc417a6e7d349a57" UNIQUE ("user_created_id"), CONSTRAINT "PK_6e567f73ed63fd388a7734cbdd3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "baner" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "imageId" integer, CONSTRAINT "REL_d6b5622569fcd7fb2ded19223b" UNIQUE ("imageId"), CONSTRAINT "PK_027ed9d1f9de452f10a0a192e28" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission" ("id" SERIAL NOT NULL, "resolves" text NOT NULL, "key" character varying NOT NULL, CONSTRAINT "UQ_20ff45fefbd3a7c04d2572c3bbd" UNIQUE ("key"), CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "figure_teams_team" ("figureId" integer NOT NULL, "teamId" integer NOT NULL, CONSTRAINT "PK_ed8b16c77d42587bc11bbd3be52" PRIMARY KEY ("figureId", "teamId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b36e99ce4c5a709317b62bd84d" ON "figure_teams_team" ("figureId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3c0465ad106af4fcd849a8a4c1" ON "figure_teams_team" ("teamId") `);
        await queryRunner.query(`CREATE TABLE "user_teams_team" ("userId" integer NOT NULL, "teamId" integer NOT NULL, CONSTRAINT "PK_da60f131c39079373054fd8ed07" PRIMARY KEY ("userId", "teamId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5b1d47a221406321be714a8186" ON "user_teams_team" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a80f8ae0d425218dbaa2240df4" ON "user_teams_team" ("teamId") `);
        await queryRunner.query(`ALTER TABLE "genre" ADD CONSTRAINT "FK_8c5f342186629deeba7a4c3601f" FOREIGN KEY ("animesId") REFERENCES "anime"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "figure" ADD CONSTRAINT "FK_cb2b72279f3e5fbad934a595133" FOREIGN KEY ("animeToTeamPostToCategoryId") REFERENCES "anime_to_team"("postToCategoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "episode_to_video_player" ADD CONSTRAINT "FK_a62d2a8e2d064854fc3599e080a" FOREIGN KEY ("episodeId") REFERENCES "episode"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "episode_to_video_player" ADD CONSTRAINT "FK_f385df907f650656a143fdc6c77" FOREIGN KEY ("videoPlayerId") REFERENCES "video_player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "episode" ADD CONSTRAINT "FK_4e06256070e4ba081229d629c01" FOREIGN KEY ("animeToTeamPostToCategoryId") REFERENCES "anime_to_team"("postToCategoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "anime_to_team" ADD CONSTRAINT "FK_2fe14112732dfe2c494c56c3061" FOREIGN KEY ("animeId") REFERENCES "anime"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "anime_to_team" ADD CONSTRAINT "FK_ff3f569a7d1a85cdb54c6078b02" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "anime" ADD CONSTRAINT "FK_5392a6fc82c834bfa7b7d6a3837" FOREIGN KEY ("posterId") REFERENCES "images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "anime" ADD CONSTRAINT "FK_a6b577a6f7cc417a6e7d349a574" FOREIGN KEY ("user_created_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "baner" ADD CONSTRAINT "FK_d6b5622569fcd7fb2ded19223b4" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "figure_teams_team" ADD CONSTRAINT "FK_b36e99ce4c5a709317b62bd84d8" FOREIGN KEY ("figureId") REFERENCES "figure"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "figure_teams_team" ADD CONSTRAINT "FK_3c0465ad106af4fcd849a8a4c11" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_teams_team" ADD CONSTRAINT "FK_5b1d47a221406321be714a8186d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_teams_team" ADD CONSTRAINT "FK_a80f8ae0d425218dbaa2240df49" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_teams_team" DROP CONSTRAINT "FK_a80f8ae0d425218dbaa2240df49"`);
        await queryRunner.query(`ALTER TABLE "user_teams_team" DROP CONSTRAINT "FK_5b1d47a221406321be714a8186d"`);
        await queryRunner.query(`ALTER TABLE "figure_teams_team" DROP CONSTRAINT "FK_3c0465ad106af4fcd849a8a4c11"`);
        await queryRunner.query(`ALTER TABLE "figure_teams_team" DROP CONSTRAINT "FK_b36e99ce4c5a709317b62bd84d8"`);
        await queryRunner.query(`ALTER TABLE "baner" DROP CONSTRAINT "FK_d6b5622569fcd7fb2ded19223b4"`);
        await queryRunner.query(`ALTER TABLE "anime" DROP CONSTRAINT "FK_a6b577a6f7cc417a6e7d349a574"`);
        await queryRunner.query(`ALTER TABLE "anime" DROP CONSTRAINT "FK_5392a6fc82c834bfa7b7d6a3837"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "anime_to_team" DROP CONSTRAINT "FK_ff3f569a7d1a85cdb54c6078b02"`);
        await queryRunner.query(`ALTER TABLE "anime_to_team" DROP CONSTRAINT "FK_2fe14112732dfe2c494c56c3061"`);
        await queryRunner.query(`ALTER TABLE "episode" DROP CONSTRAINT "FK_4e06256070e4ba081229d629c01"`);
        await queryRunner.query(`ALTER TABLE "episode_to_video_player" DROP CONSTRAINT "FK_f385df907f650656a143fdc6c77"`);
        await queryRunner.query(`ALTER TABLE "episode_to_video_player" DROP CONSTRAINT "FK_a62d2a8e2d064854fc3599e080a"`);
        await queryRunner.query(`ALTER TABLE "figure" DROP CONSTRAINT "FK_cb2b72279f3e5fbad934a595133"`);
        await queryRunner.query(`ALTER TABLE "genre" DROP CONSTRAINT "FK_8c5f342186629deeba7a4c3601f"`);
        await queryRunner.query(`DROP INDEX "IDX_a80f8ae0d425218dbaa2240df4"`);
        await queryRunner.query(`DROP INDEX "IDX_5b1d47a221406321be714a8186"`);
        await queryRunner.query(`DROP TABLE "user_teams_team"`);
        await queryRunner.query(`DROP INDEX "IDX_3c0465ad106af4fcd849a8a4c1"`);
        await queryRunner.query(`DROP INDEX "IDX_b36e99ce4c5a709317b62bd84d"`);
        await queryRunner.query(`DROP TABLE "figure_teams_team"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP TABLE "baner"`);
        await queryRunner.query(`DROP TABLE "anime"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "team"`);
        await queryRunner.query(`DROP TABLE "anime_to_team"`);
        await queryRunner.query(`DROP TABLE "episode"`);
        await queryRunner.query(`DROP TABLE "episode_to_video_player"`);
        await queryRunner.query(`DROP TABLE "video_player"`);
        await queryRunner.query(`DROP TABLE "figure"`);
        await queryRunner.query(`DROP TABLE "genre"`);
        await queryRunner.query(`DROP TABLE "images"`);
    }

}
