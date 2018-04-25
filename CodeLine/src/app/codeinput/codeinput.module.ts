import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'; // 服务中需要实例化http
import { CodeMirrorComponent } from './scroll/code/codemirror.component';
import { CodeLineComponent } from './scroll/code/line/codeline.component';
import { InTextareaComponent } from './inTextarea/inTextarea.component';
import { CodeInputComponent } from './codeinput.component';
import { KeyService } from './KeyService';
import { KeywordService } from './KeywordService';
import { ContactService } from './ContactService';

import { BypassSecurityTrustHtmlPipe } from './scroll/code/line/code.Pipe';

@NgModule({
    declarations: [CodeInputComponent, CodeMirrorComponent, CodeLineComponent, InTextareaComponent, BypassSecurityTrustHtmlPipe],
    entryComponents: [CodeLineComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule,HttpModule],
    exports: [CodeInputComponent],
    providers: [KeyService, KeywordService, ContactService],
})
export class CodeInputModule { }