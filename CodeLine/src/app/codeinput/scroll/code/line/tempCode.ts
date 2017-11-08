 
/**
 * 代码模板
 */
export class TempModel {
    
    static ModelProperty(val: string): string {
        // 属性
        let elements = '<span class="cm-property">' + val + '</span>';
        return elements;
    }
    static ModelString(val: string): string {
        // 字符串
        let elements = '<span class="cm-string">' + val + '</span>';
        return elements;
    }
    static ModelVariable(val: string): string {
        // 对象1
        let elements = '<span class="cm-variable">' + val + '</span>';
        return elements;
    }
    static ModelKeyword(val: string): string {
        // 关键字
        let elements = '<span class="cm-keyword">' + val + '</span>';
        return elements;
    }
    static ModelDef(val: string): string {
        // 参数
        let elements = '<span class="cm-def">' + val + '</span>';
        return elements;
    }
    static ModelVariable2(val: string): string {
        // 对象2
        let elements = '<span class="cm-variable-2">' + val + '</span>';
        return elements;
    }
    static ModelOperator(val: string): string {
        // 操作符
        let elements = '<span class="cm-">' + val + '</span>';
        return elements;
    }
    static ModelComment(val: string): string {
        // 注释说明
        let elements = '<span class="cm-comment">' + val + '</span>';
        return elements;
    }
}

 /**
 * code模式，单击出发事件模型
 */
export class ClickModel {
    public x:number = 0; // 模型X坐标位置
    public y:number = 0; // 模型Y坐标位置
    public codeWidth:number = 0; // 模型的宽度
    public codeHeight:number = 0; // 模型的高度
    public line:number = 0; // 模型在第几行
}