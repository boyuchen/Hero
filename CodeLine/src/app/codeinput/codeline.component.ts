import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'codeline',
    templateUrl: './codeline.component.html',
    styleUrls: ['./codeline.component.css']
})
export class NameComponent implements OnInit {
    constructor() { }

    line:number = 0;

    ngOnInit() { }
}