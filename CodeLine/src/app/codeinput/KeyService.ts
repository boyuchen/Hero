import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class KeyService {
    private _valueChanges: string = "";

    public setValue(str: string): void {
        this._valueChanges = str;
    }

    /**
     * getcodechar 获取一个Observable订阅对象
     */
    public getcodechar(): Subject<string> {

        let subject = new Subject<string>();
        if(this._valueChanges != ""){
            subject.next(this._valueChanges);
        }
        this._valueChanges = "";
        return subject;
        
    }

}