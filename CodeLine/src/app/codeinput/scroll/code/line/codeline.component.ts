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
    public point = { x: 0, y: 0 }; // 组件位置
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

    private arrIndex: number[]; // 判断字符位置的索引数组
    public cursorsIndex: number = 0; // 光标位置
    public codeWidth: number = 0; // 组件宽度
    public codeHeight: number = 0; // 组件高度

    @Output() CodeLineClick = new EventEmitter<ClickModel>();

    ngOnInit() { }

    OnEditClick(event: any): void {
        let data = new ClickModel();
        data.line = this.line;
        data.codeHeight = this.codeHeight = event.target.clientHeight; // pre元素高度和宽度
        this.SetCursors(event.offsetX); // 设置光标位置
        data.customLeft = this.cursorsLeftWidth;
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
            if (c) {
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
        let model: CharModel = new CharModel(); // 新建字符模型
        for (var index = 0; index < this._codeArray.length; index++) {
            var charlength = this._codeArray[index]; // 当前字符位数
            let endcharLeft = this._multiple * charlength; // 最后一个字符间距
            let startcharLeft = codeWidth; // 代码最后第二个到左边的距离
            codeWidth = startcharLeft + endcharLeft; // 最后一个字符到左边的距离

            if (codeWidth >= cursorsWidth) {
                // 判断光标在字符左半边还是右半边
                if (startcharLeft + endcharLeft / 2 >= cursorsWidth) {
                    this.cursorsLeftWidth = startcharLeft; // 光标在字符左半边 + 字符差值
                }
                else {
                    this.cursorsLeftWidth = startcharLeft + endcharLeft; // 光标在字符右半边
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
}