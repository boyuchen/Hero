import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class KeyService {
    private subject:Subject<string> = new Subject<string>();
    public line:number=0;

    /**
     * getcodechar 获取一个Observable订阅对象
     */
    public getcodechar(): Subject<string> {
        return this.subject;
    }

    /**
     * 过滤关键字推送数据
     */
    public sendcodechar(e:any):void{
        // 键盘过滤
        let keyCode = e.keyCode || e.which || e.charCode;
        let ctrlKey = e.ctrlKey || e.metaKey;
        if(ctrlKey && keyCode == "86"){
            // 捕获粘贴操作并发送事件
            return this.subject.next("Control+V");
        }
        let filter = ['Tab','CapsLock','Shift','Control','Meta','Alt','ArrowUp','ArrowRight','ArrowDown','ArrowLeft','Delete','Home','End','Process'];
        return filter.indexOf(e.key) >= 0 ? void 0:this.subject.next(e.key);
    }

}