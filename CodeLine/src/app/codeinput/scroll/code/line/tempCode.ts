// 代码模板
export class TempModel {
    ModelProperty(val: string): string {
        // 属性
        let elements = '<span class="cm-property">' + val + '</span>';
        return elements;
    }
    ModelString(val: string): string {
        // 字符串
        let elements = '<span class="cm-string">' + val + '</span>';
        return elements;
    }
    ModelVariable(val: string): string {
        // 对象1
        let elements = '<span class="cm-variable">' + val + '</span>';
        return elements;
    }
    ModelKeyword(val: string): string {
        // 关键字
        let elements = '<span class="cm-keyword">' + val + '</span>';
        return elements;
    }
    ModelDef(val: string): string {
        // 参数
        let elements = '<span class="cm-def">' + val + '</span>';
        return elements;
    }
    ModelVariable2(val: string): string {
        // 对象2
        let elements = '<span class="cm-variable-2">' + val + '</span>';
        return elements;
    }
    ModelOperator(val: string): string {
        // 操作符
        let elements = '<span class="cm-">' + val + '</span>';
        return elements;
    }
    ModelComment(val: string): string {
        // 注释说明
        let elements = '<span class="cm-comment">' + val + '</span>';
        return elements;
    }
}