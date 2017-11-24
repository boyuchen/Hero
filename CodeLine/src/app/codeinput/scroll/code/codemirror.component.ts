import { Component, OnInit,ViewChild } from '@angular/core';
import { ClickModel } from './line/tempCode';
import { CodeLineComponent } from './line/codeline.component';

@Component({
    selector: 'code-mirror',
    templateUrl: './codemirror.component.html',
    styleUrls: ['./codemirror.component.css']
})
export class CodeMirrorComponent implements OnInit {
    public isHidden:boolean = true; // 是否隐藏光标
    public left:string = '0px';
    public top:string = '0px';
    public height:string = '12px';
    public cursor_ms; // 光标计时器

    @ViewChild(CodeLineComponent)
    private codelineComponent:CodeLineComponent; // 子组件对象

    constructor() { }

    ngOnInit() { }

    EditCodeMirror(data: ClickModel): void {
        this.isHidden = false; // 显示光标
        // 光标显示计时 
        clearInterval(this.cursor_ms);
        this.cursor_ms =  setInterval(()=>{this.isHidden=!this.isHidden},500);
        // 更新光标位置
        this.left = data.customLeft + 'px';
        this.top = (data.line - 1) * data.codeHeight + 'px';
        this.height = data.codeHeight  + 'px';
    }
}