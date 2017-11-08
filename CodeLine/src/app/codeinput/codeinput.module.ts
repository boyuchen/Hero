import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeMirrorComponent } from './scroll/code/codemirror.component';
import { CodeLineComponent } from './scroll/code/line/codeline.component';


@NgModule({
    declarations: [CodeMirrorComponent,CodeLineComponent],
    imports: [CommonModule],
    exports: [],
    providers: [],
})
export class CodeInputModule { }