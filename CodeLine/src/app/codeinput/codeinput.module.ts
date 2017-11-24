import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeMirrorComponent } from './scroll/code/codemirror.component';
import { CodeLineComponent } from './scroll/code/line/codeline.component';
import { InTextareaComponent } from './inTextarea/inTextarea.component';
import { CodeInputComponent } from './codeinput.component';


@NgModule({
    declarations: [CodeInputComponent,CodeMirrorComponent,CodeLineComponent,InTextareaComponent],
    imports: [CommonModule],
    exports: [CodeInputComponent],
    providers: [],
})
export class CodeInputModule { }