import { Component, OnInit } from '@angular/core';
import { ClickModel } from './line/clickmodel';


@Component({
    selector: 'codemirror',
    templateUrl: './codemirror.component.html',
    styleUrls: ['./codemirror.component.css']
})
export class CodeMirrorComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

    EditCodeMirror(data: ClickModel): void {

    }

    /**
     * 控制光标位置
     * cursorsWidth:开始位置到光标位置的宽度
     */
    SetCursors(cursorsWidth: number): void {

        // tode:控制光标位置
    }

    GetCursors(): void {
        // tode:获取光标位置
    }

}