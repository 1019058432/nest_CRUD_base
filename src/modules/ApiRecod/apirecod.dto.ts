import {Exclude, Transform} from 'class-transformer';
export class GetOneDto {
    id: number;

    @Exclude() //排除改属性
    sId: number; 
    @Transform(({ value, key, obj, type }) => {
        // console.log(value); // value	转换前的属性值。
        // console.log(key); // key	转换后的属性的名称。
        // console.log(obj);  // obj	转化源对象。
        // console.log(type); // type	转换类型。
        // options	选项对象传递到转换方法。
        return {...obj}
    })
    dec: string;

    @Exclude() //排除改属性
    isShow: number

    @Transform(({ value, obj }) => {
        console.log("不存在的属性不执行该函数");
        return {...obj}
    })
    text: string;
}