import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class KeyService {
    private subject:Subject<string> = new Subject<string>();

    /**
     * getcodechar 获取一个Observable订阅对象
     */
    public getcodechar(): Subject<string> {
        return this.subject;
    }

}