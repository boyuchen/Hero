import { Component, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit,
     ViewContainerRef, ComponentFactoryResolver,ComponentFactory,ComponentRef 
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

    @ViewChildren(CodeLineComponent)
    private codelineComponentList: QueryList<CodeLineComponent>; // 子组件对象集合

    @ViewChild("CodeMirrorContainer", { read: ViewContainerRef }) container: ViewContainerRef; // 存放子组件容器对象

    //  resolver 为动态组件服务
    constructor(private service: KeyService, private resolver: ComponentFactoryResolver) { }

    ngOnInit() { }

    ngAfterViewInit() {
<<<<<<< HEAD
        this.InsertComponent(8,"测试第8行");
        // 订阅键盘服务
        this.service.getcodechar().subscribe(item => {
            // 查找到集合中的使用中的子组件   
            console.dir(this.codelineComponentList);
=======
        this.codelineComponentList.changes.subscribe(e => console.log("QueryList length:" + this.codelineComponentList.length));
        // 订阅键盘服务
        this.service.getcodechar().subscribe(item => {
            // 查找到集合中的使用中的子组件
            
>>>>>>> dcc02a48bb21cba422da1eb0ce0e560e84fffc0d
            let codelineComponent = this.codelineComponentList.find(model => model.line == this.service.line);
            switch (item) {
                case 'Backspace':
                    codelineComponent.OnKeyDown("", "del");
                    break;
                case '\n':
                    // 回车插入指定位置组件
                    this.InsertComponent(7,"dfsdfs");
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
    InsertComponent(line:number, str:string): void {
        const factory: ComponentFactory<CodeLineComponent> =
            this.resolver.resolveComponentFactory(CodeLineComponent);
        this.componentRef = this.container.createComponent(factory);
        this.componentRef.instance.line = line;
        this.componentRef.instance.codeString = str;
        this.componentRef.instance.CodeLineClick.subscribe(data => this.EditCodeMirror(data)); // 订阅事件调用
    }
}