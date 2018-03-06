import { Component, OnInit, Output, Input, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { TempModel, ClickModel, CharModel } from './tempCode';

@Component({
    selector: 'codeline',
    templateUrl: './codeline.component.html',
    styleUrls: ['./codeline.component.css']
})
export class CodeLineComponent implements OnInit {
    constructor() { }

    private _codeString: string = '';
    private _multiple: number = 7;// 一个字符的像素，中文12像素
    private _codeArray = []; // 字符分割位置数组
    private cursorsLeftWidth: number = 0; // 光标距离左边的距离
    private cursorindex: number = 0; // 光标位置
    private selection: string = ''; // 选中文字
    @Input() line: number = 0; // 行号

    @ViewChild('pretemp') pretempDom: ElementRef; // 本地DOM元素

    @Input()
    set codeString(str: string) {
        this._codeString = str;
        // 获取DOM元素更新组件宽高
        let preElement = this.pretempDom.nativeElement;
        this.codeHeight = preElement.clientHeight;
        this.codeWidth = preElement.clientWidth;
        this._codeArray = this.GetCodeArray(); // 赋值数组
    } // 代码
    get codeString() { return this._codeString; }

    public codeWidth: number = 0; // 组件宽度
    public codeHeight: number = 0; // 组件高度

    @Output() CodeLineClick = new EventEmitter<ClickModel>();

    ngOnInit() { }

    OnEditClick(event: any): void {
        this.selection = window.getSelection().toString();  // 选中项
        this.SendEditClick(event.target.clientHeight, event.offsetX);
    }

    /**触发父组件绑定事件
     * height：pre高度，cursorsWidth：光标位置
     */
    public SendEditClick(height: number, cursorsWidth: number): void {
        let data = new ClickModel();
        data.line = this.line;
        data.codeHeight = this.codeHeight = height; // pre元素高度和宽度
        this.SetCursors(cursorsWidth); // 设置光标位置
        data.customLeft = this.cursorsLeftWidth;
        data.isCustomHidden = this.selection == "" ? false : true; // 选中文字不需要输入光标
        this.CodeLineClick.emit(data);
    }

    /**
     * 获取字符分割位置数组
     */
    GetCodeArray(): number[] {
        let rel = [];
        for (var index = 0; index < this._codeString.length; index++) {
            var char = this._codeString[index];
            // 通过字符模型得到字符宽度差值
            let c = /[\u4e00-\u9fbb]/i.exec(char);
            let symbol = "，。；？~！：‘“”’【】（）"; // 中文标点符号为2个字符处理
            if (c || symbol.indexOf(char) >= 0) {
                rel.push(2);
            }
            else {
                rel.push(1);
            }
        }
        return rel;
    }

    /**
     * 控制光标位置
     * cursorsWidth:开始位置到光标位置的宽度
     */
    SetCursors(cursorsWidth: number): void {
        let codeWidth = 0; // 字符距离左边距距离
        for (var index = 0; index < this._codeArray.length; index++) {
            var charlength = this._codeArray[index]; // 当前字符位数
            let endcharLeft = this._multiple * charlength; // 最后一个字符间距
            let startcharLeft = codeWidth; // 代码最后第二个到左边的距离
            codeWidth = startcharLeft + endcharLeft; // 最后一个字符到左边的距离

            if (codeWidth >= cursorsWidth) {
                // 判断光标在字符左半边还是右半边
                if (startcharLeft + endcharLeft / 2 >= cursorsWidth) {
                    this.cursorsLeftWidth = startcharLeft; // 光标在字符左半边 + 字符差值
                    this.cursorindex = index; // 光标位置
                }
                else {
                    this.cursorsLeftWidth = startcharLeft + endcharLeft; // 光标在字符右半边
                    this.cursorindex = index + 1; // 光标位置
                }

                return;
            }
            else if (index >= this._codeArray.length) {
                this.cursorsLeftWidth = codeWidth;
            }
        }
    }

    /** 
     * 获取光标位置
     */
    GetCursors(): number {
        return this.cursorsLeftWidth;
    }

    /**
     * 键盘按下事件
     */
    OnKeyPress(event: any): void {
        let key = event.key;
        if (key == "Backspace") {
            this.OnKeyDown(this.selection, "del");
        }
        
    }

    /**
     * OnKeyDown事件处理
     * str：输入或者删除字符
     * mode: in/del 插入或者删除模式
     */
    OnKeyDown(str: string, mode: string): void {
        let index, strstart, strend, operator;

        if (mode == "in") {
            index = this.cursorindex;
            strstart = this._codeString.substring(0, index);
            strend = this._codeString.substring(index);
            this.codeString = strstart + str + strend; // 1.初始化字符串属性    
            operator = 1; // 插入光标向前
        }
        else if (mode == "del") {
            str = str == "" ? this.codeString[this.cursorindex - 1] : str;
            index = this.codeString.indexOf(str);
            strstart = this._codeString.substring(0, index);
            strend = this._codeString.substring(index + str.length);
            this.codeString = strstart + strend; // 1.初始化字符串属性    
            operator = -1; // 删除光标向后
        }

        let sum = 0; // 要移动数组集合
        for (var i = 0; i < str.length; i++) {
            sum += this._codeArray[index + i];
        }
        let cursorsWidth = this.GetCursors() + operator * sum * this._multiple // 2.获取光标位置
        this.SendEditClick(this.codeHeight, cursorsWidth); // 3.操作父组件移动光标
    }

    /**
     * 返回光标后面的字符串
     */
    GetStrEnd():string{
        return this._codeString.substring(this.cursorindex);
    }

    /**
     * 返回开始位置到光标的字符串
     */
    GetStrStart():string{
        return this._codeString.substring(0,this.cursorindex);
    }
}