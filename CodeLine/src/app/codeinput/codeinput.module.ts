import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CodeMirrorComponent } from './scroll/code/codemirror.component';
import { CodeLineComponent } from './scroll/code/line/codeline.component';
import { InTextareaComponent } from './inTextarea/inTextarea.component';
import { CodeInputComponent } from './codeinput.component';
import { KeyService } from './KeyService';


@NgModule({
    declarations: [CodeInputComponent, CodeMirrorComponent, CodeLineComponent, InTextareaComponent],
    entryComponents:[CodeLineComponent],
    imports: [CommonModule,FormsModule,ReactiveFormsModule],
    exports: [CodeInputComponent],
    providers: [KeyService],
})  
export class CodeInputModule { }