import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'codeline',
    templateUrl: './codeline.component.html',
    styleUrls: ['./codeline.component.css']
})
export class CodeLineComponent implements OnInit {
    constructor() { }

    line:number = 0;

    ngOnInit() { }
}