import { Component, OnInit,Input } from '@angular/core';
import { TempModel } from './tempCode';

@Component({
    selector: 'codeline',
    templateUrl: './codeline.component.html',
    styleUrls: ['./codeline.component.css']
})
export class CodeLineComponent implements OnInit {
    constructor() { }

    line:number = 0; // 行号

    @Input() codeString:string; // 代码
    cursorsIndex:number = 0; // 光标位置

    ngOnInit() { }
}