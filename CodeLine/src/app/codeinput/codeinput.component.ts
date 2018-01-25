import { Component, OnInit  } from '@angular/core';

@Component({
    selector: 'codeinput',
    templateUrl: './codeinput.component.html',
    styleUrls: ['./codeinput.component.css', './codemirror.min.css']
})
export class CodeInputComponent implements OnInit {

    public left: string = '50px';
    public top: string = '14px';
    public height: string = '12px';

    constructor() { }

    ngOnInit() {}
}