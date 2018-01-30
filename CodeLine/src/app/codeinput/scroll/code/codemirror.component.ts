import {
    Component, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit,
    ViewContainerRef, ComponentFactoryResolver, ComponentFactory, ComponentRef
} from '@angular/core';
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
    private componentRef: ComponentRef<CodeLineComponent>; // 新建子组件对象
    private list: Array<CodeLineComponent>;

    @ViewChildren(CodeLineComponent)
    private codelineComponentList: QueryList<CodeLineComponent>; // 子组件对象集合

    @ViewChild("CodeMirrorContainer", { read: ViewContainerRef }) container: ViewContainerRef; // 存放子组件容器对象

    //  resolver 为动态组件服务
    constructor(private service: KeyService, private resolver: ComponentFactoryResolver) { }

    ngOnInit() { }

    ngAfterViewInit() {
        this.list = this.codelineComponentList.toArray(); // 初始化数组
        // 订阅键盘服务
        this.service.getcodechar().subscribe(item => {
            // 查找到集合中的使用中的子组件
            let codelineComponent = this.list.find(model => model.line == this.service.line);

            switch (item) {
                case 'Backspace':
                    codelineComponent.OnKeyDown("", "del");
                    break;
                case 'Enter':
                    // 回车插入指定位置组件
                    this.InsertComponent(codelineComponent.line + 1, codelineComponent.GetStrEnd());
                    // 剪切光标前后的字符串
                    codelineComponent.codeString = codelineComponent.GetStrStart();
                    break;
                case 'Control+V':
                    console.log("粘贴事件触发");
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

    /**
     * 插入新的子组件
     * line：行号
     * str：内容
     */
    InsertComponent(line: number, str: string): void {
        const factory: ComponentFactory<CodeLineComponent> = this.resolver.resolveComponentFactory(CodeLineComponent);
        this.componentRef = this.container.createComponent(factory, line - 1);
        this.componentRef.instance.line = line; // 设置实例属性和事件
        this.componentRef.instance.codeString = str;
        this.componentRef.instance.CodeLineClick.subscribe(data => this.EditCodeMirror(data)); // 订阅事件调用
        if (this.list) {
            this.list.filter(mode => mode.line >= line).map(m => m.line = m.line + 1); // 行号递增
            this.list.push(this.componentRef.instance); // 子组件添加到数组
        }
    }
}   