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
    public sendcodechar(keyCode:any):void{
        // 键盘过滤
        if (keyCode >= 48 && keyCode <= 57)
        {

        }
        else{

        }
        return this.subject.next(keyCode);
    }

}