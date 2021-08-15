import {Expose} from "class-transformer";
import {Column, CreateDateColumn, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class ViewsInformation {
  @Expose()
  @Column()
  views: number;

  @Expose()
  @PrimaryColumn()
  animeId: number;

  @Expose()
  @PrimaryColumn()
  dateMonth: string;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;
}
