import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: "exe-alert",
    template: `
      <h1 (click)="output.next(type)">Alert {{type}}</h1>
    `,
})
export class AlertComponent {
    @Input() type: string = "success";
    @Output() output = new EventEmitter();
}