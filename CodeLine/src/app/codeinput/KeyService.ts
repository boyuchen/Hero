import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { KeywordService } from './KeywordService';

@Injectable()
export class KeyService {
    constructor(private service: KeywordService){} // 服务中实例化服务。也可以在函数中 new 新建一个服务
    private subject: Subject<string> = new Subject<string>();
    public line: number = 0;
    public event: string = '';

    /**
     * getcodechar 获取一个Observable订阅对象
     */
    public getcodechar(e: any): void {
        if (this.event == 'Paste') {
            // 处理多行粘贴分段发送
            this.PasteComponent(e);
        }
        else if (this.event == 'Enter') {

        }
        else
            this.subject.next(e);
    }

    public getSubject(): Subject<string> {
        return this.subject;
    }

    /**
     * 过滤关键字推送数据
     */
    public sendcodechar(e: any): void {
        // 键盘过滤
        let keyCode = e.keyCode || e.which || e.charCode;
        let ctrlKey = e.ctrlKey || e.metaKey;
        if (ctrlKey && keyCode == "86") {
            // 捕获粘贴操作并发送事件
            this.event = 'Paste';
            return this.subject.next("Control+V");
        }
        else if (e.key == 'Enter') {
            this.event = 'Enter';
            this.subject.next('Enter');
        }
        else if (e.key == 'Backspace') {
            this.event = 'Backspace';
            this.subject.next('Backspace');
        }
        let filter = ['Tab', 'CapsLock', 'Shift', 'Control', 'Meta', 'Alt', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'Delete', 'Home', 'End', 'Process'];
        this.event = e.key; // 触发事件名称
    }

    /**
     * 分段发用数据
     * str： 粘贴文本
     */
    private PasteComponent(str: string): void {
        let list = str.split('\n');
        for (var index = 0; index < list.length; index++) {
            var element = list[index];
            this.subject.next(element);
            if (list.length - index > 1) {
                this.subject.next('Enter');
            }
        }
    }

    /**
     * 静态化模板替换
     * str：输入字符串
     * return：替换模板
     */
    private ReplaceData(str: string): string {
        let ret = this.service.AIPlay(str);
        console.log('静态化模板替换：' + ret);
        return ret;
    }
}