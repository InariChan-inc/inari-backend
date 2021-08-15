import {Expose} from "class-transformer";
import {CreateDateColumn, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class ViewsData {
  @PrimaryColumn()
  ip: string;

  @PrimaryColumn()
  animeId: number;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;
}
