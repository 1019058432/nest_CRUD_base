import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsEnum, Max, Min } from "class-validator";
// export type Boolean_Value = 0 | 1;
enum Boolean_Value {
  "T"= 1,
  "F"= 0
}
@Entity("api_recod", { schema: "nest_crud" })
export class ApiRecod {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "s_id" })
  sId: number;

  @Column("varchar", { name: "dec", nullable: true, length: 100 })
  dec: string | null;

  @Column({ type:"tinyint", name: "is_show", enum: Boolean_Value, width: 1 })
  // @Min(0)
  // @Max(1)
  @IsEnum(Boolean_Value) // not is the is_Enum(value,enum)
  isShow: number;
}
