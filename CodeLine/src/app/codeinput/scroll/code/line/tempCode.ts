 
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
    public codeHeight:number = 0; // 模型的高度
    public line:number = 0; // 模型在第几行
    public customLeft:number = 0; // 光标距离左边的距离
    public isCustomHidden:boolean = false; // 是否显示光标
}

/**
 * 字符宽度模型
 */
export class CharModel {
    public chars = {a:0,b:0,c:0,d:0,e:0};
}