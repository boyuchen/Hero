import { Component, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ClickModel } from './line/tempCode';
import { CodeLineComponent } from './line/codeline.component';
import { KeyService } from '../../KeyService';

@Component({
    selector: 'code-mirror',
    templateUrl: './codemirror.component.html',
    styleUrls: ['./codemirror.component.css']
})
export class CodeMirrorComponent implements OnInit {
    public isHidden: boolean = true; // 是否隐藏光标
    public left: string = '0px'; // 光标坐标
    public top: string = '0px';
    public height: string = '12px';
    public cursor_line: number = 0; // 光标在具体在哪一行
    public cursor_ms; // 光标计时器

    @ViewChildren(CodeLineComponent)
    private codelineComponentList: QueryList<CodeLineComponent>; // 子组件对象集合

    constructor(private service: KeyService) { }

    ngOnInit() {}

    ngAfterViewInit() {
        // 订阅键盘服务
        this.service.getcodechar().subscribe(item => {
            // 查找到集合中的使用中的子组件
            let codelineComponent = this.codelineComponentList.find(model => model.line == this.service.line);
            switch (item) {
                case 'Backspace':
                    codelineComponent.OnKeyDown("", "del");
                    break;

                default:
                    codelineComponent.OnKeyDown(item, "in");
                    break;
            }

            console.log('CodeMirrorComponent line ' + codelineComponent.line + ' value:' + item);
        });
    }

    /** 
     * 移动光标触发事件
     * data：子组件发送来的数据
     */
    EditCodeMirror(data: ClickModel): void {
        this.isHidden = data.isCustomHidden; // 显示光标
        // 光标显示计时 
        clearInterval(this.cursor_ms);
        if (!data.isCustomHidden) {
            this.cursor_ms = setInterval(() => { this.isHidden = !this.isHidden }, 500);
            document.getElementById('txtedit').focus(); // 触发文本框焦点
            // 更新光标位置
            this.service.line = this.cursor_line = data.line; // 行号
            this.left = data.customLeft + 'px';
            this.top = (data.line - 1) * data.codeHeight + 'px';
            this.height = data.codeHeight + 'px';
        }
    }
}