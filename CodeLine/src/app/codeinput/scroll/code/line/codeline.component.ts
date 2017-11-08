import { Component, OnInit,Output,Input,EventEmitter,ElementRef } from '@angular/core';
import { TempModel,ClickModel } from './tempCode';

@Component({
    selector: 'codeline',
    templateUrl: './codeline.component.html',
    styleUrls: ['./codeline.component.css']
})
export class CodeLineComponent implements OnInit {
    constructor() { }

    public point = {x:0,y:0}; // 组件位置
    public line:number = 0; // 行号
    @Input() codeString:string; // 代码
    private arrIndex:number[]; // 判断字符位置的索引数组
    public cursorsIndex:number = 0; // 光标位置
    @Input() codeWidth:number = 0; // 组件宽度
    public codeHeight:number = 0; // 组件高度

    @Output() CodeLineClick = new EventEmitter<ClickModel>();

    ngOnInit() { }

    OnEditClick(target:any):void{ 
        let data = new ClickModel();
        data.line = this.line;
        data.x = target.x; // 鼠标点击坐标
        data.y = target.y;
        data.codeHeight = this.codeHeight;
        data.codeWidth = this.codeWidth;  
        this.CodeLineClick.emit(data);
    }
}