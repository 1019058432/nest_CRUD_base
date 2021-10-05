import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("nest_db", { schema: "test" })
export class NestDb {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", {
    name: "server_name",
    nullable: true,
    comment: "服务名称",
    length: 100,
  })
  serverName: string | null;
}
