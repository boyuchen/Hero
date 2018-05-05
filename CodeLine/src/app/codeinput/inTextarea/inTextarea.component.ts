import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { KeyService } from '../KeyService';

@Component({
    selector: 'inTextarea',
    templateUrl: './inTextarea.component.html',
    styleUrls: ['./inTextarea.component.css']
})
export class InTextareaComponent implements OnInit {
    term = new FormControl();
    constructor(private service:KeyService) { }

    ngOnInit() {
        // 订阅键盘事件
        this.term.valueChanges
        .debounceTime(500)
        .subscribe(items => {
            console.log('订阅键盘事件:' + items);
            this.service.getcodechar(items);
            this.term.setValue("");
        });
     }

     /** 
     * 键盘按下事件
     */
    OnKeyPress(event: any): void {
        console.log('键盘按下事件');
        this.service.sendcodechar(event);      
        // 禁用默认输入，不能禁用需要他来完成粘贴操作
    }
}