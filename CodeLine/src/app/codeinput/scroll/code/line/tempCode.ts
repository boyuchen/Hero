
/**
 * 代码模板
 */
export class TempModel {
    // 关键字集合
    public KeyList(): any {
        return ['class', 'interface', 'public', 'private', 'namespace', 'using', 'string', 'int','let','this',
                'export', 'if', 'switch', 'case', 'break', 'default', 'return'];
    }

    public ModelProperty(val: string): string {
        // 属性
        let elements = '<span style="pointer-events: none" class="cm-property">' + val + '</span>';
        return elements;
    }
    public ModelString(val: string): string {
        // 字符串
        let elements = '<span style="pointer-events: none" class="cm-string">' + val + '</span>';
        return elements;
    }
    public ModelVariable(val: string): string {
        // 对象1
        let elements = '<span style="pointer-events: none" class="cm-variable">' + val + '</span>';
        return elements;
    }
    public ModelKeyword(val: string): string {
        // 关键字
        let elements = '<span style="pointer-events: none" class="cm-keyword">' + val + '</span>';
        return elements;
    }
    public ModelDef(val: string): string {
        // 参数
        let elements = '<span style="pointer-events: none" class="cm-def">' + val + '</span>';
        return elements;
    }
    public ModelVariable2(val: string): string {
        // 对象2
        let elements = '<span style="pointer-events: none" class="cm-variable-2">' + val + '</span>';
        return elements;
    }
    public ModelOperator(val: string): string {
        // 操作符
        let elements = '<span style="pointer-events: none" class="cm-">' + val + '</span>';
        return elements;
    }
    public ModelComment(val: string): string {
        // 注释说明
        let elements = '<span style="pointer-events: none" class="cm-comment">' + val + '</span>';
        return elements;
    }
    constructor() { }
}

/**
 * keywordMode 数据模型
 */
export class KeywordMode {
    private arr: string[];
    constructor(arr: string[]) {
        this.arr = arr;
    }

    public SetArr(arr:string[]):void{
        this.arr = arr;
    }

    public get length(){
        return this.arr.length;
    }

    public GetValue(index:number):string{
        return this.arr[index];
    }

    public Slice(start?: number, end?: number):string[]{
        return this.arr.slice(start,end);
    }

}

/**
* code模式，单击出发事件模型
*/
export class ClickModel {
    public codeHeight: number = 0; // 模型的高度
    public line: number = 0; // 模型在第几行
    public customLeft: number = 0; // 光标距离左边的距离
    public isCustomHidden: boolean = false; // 是否显示光标
}

/**
 * 字符宽度模型
 */
export class CharModel {
    public chars = { a: 0, b: 0, c: 0, d: 0, e: 0 };
}