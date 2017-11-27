import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'inTextarea',
    templateUrl: './inTextarea.component.html',
    styleUrls: ['./inTextarea.component.css']
})
export class InTextareaComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

    OnKeyPress(event:any):void {
        let keyCode=event.keyCode;
        if (keyCode >= 48 && keyCode <= 57)
        {
            event.returnValue = true;
        } 
        else 
        {
            event.returnValue = false;
        }
        console.log('keycode');
    }
}