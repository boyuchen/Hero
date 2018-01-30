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
        .distinctUntilChanged()
        .subscribe(items => {
            this.service.getcodechar().next(items);
            this.term.setValue("");
            console.log('subscribe:' + items);
        });
     }

     /** 
     * 键盘按下事件
     */
    OnKeyPress(event: any): void {
        this.service.sendcodechar(event);
        event.returnValue = false; // 禁用默认输入
    }
}