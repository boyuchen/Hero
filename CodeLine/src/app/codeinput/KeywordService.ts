import { Injectable } from '@angular/core';
import { TempModel, KeywordMode } from './scroll/code/line/tempCode';
import { ContactService } from './ContactService';

@Injectable()
export class KeywordService extends TempModel {
    constructor(private _contactservice: ContactService) { super(); }

    private chars: string[] = []; // 字符串数组
    private index: number = 0; // 当前处理到的索引
    private mode: KeywordMode; // 数据模型
    /**

     * 计算字符关键字位置调用相应的函数
     */
    public AIPlay(str: string): string {
        this.chars = this.GetStringtoArr(str); // 分割单词
        this.index = 0; // 初始化
        this.mode = new KeywordMode(this.chars);
        let keylist = super.KeyList(); // 关键字集合       

        // 引用本地json文件
        this._contactservice.getContactsData().subscribe(data => {
            while (this.index < this.chars.length) {
                let i = super.KeyList()[this.chars[this.index]]; // 获取关键字类型
                if (i == null) {
                    this.ValueNameFunction();
                }
                else if (i < keylist.if && i > -1) {
                    this.KeyFunction(data, str);
                }
                else if (i >= keylist.if && i < keylist.return) {
                    this.OperatorFunction();
                }
            }
        })


        return this.chars.join(' ');
    }

    /**
     * 返回一个单词的数组
     */
    private GetStringtoArr(str: string): string[] {
        let p = [];
        if (str != null) {
            let arr = str.split(' ');
            for (var index = 0; index < arr.length; index++) {
                var element = arr[index];
                if (element != "") {
                    p.push(element);
                }
            }
        }
        return p;
    }

    /**
     * 关键字方法
     * obj：数据模型
     * return：从模型数据中第二位数组的模型数据
     */
    private KeyFunction(data: any, str: string):void {
        let key = this.chars[this.index];
        if (data[key][0]) {
            let reg: RegExp = new RegExp(data[key][0]);
            let p = str.match(reg);
            let value = "";
            for (var index = 1; index <= data[key][1]; index++) {
                var v = str.replace(reg, '$' + index);
                value += " " + super.ModelKeyword(v);
            }
            str = str.replace(reg,value);
        }
    }

    /**
     * 值方法
     * obj：数据模型
     * return：从模型数据中第二位数组的模型数据
     */
    private ValueNameFunction(): KeywordService {
        let obj: KeywordMode = this.mode; // 处理过后的模型
        if (obj.length > 0) {
            let value = obj.GetValue(0); // 处理第一位数组
            this.chars[this.index] = super.ModelString(value);
            this.index++;
        }

        this.mode.SetArr(this.chars.slice(this.index)); // 处理下一个单词
        return this;
    }

    /**
     * 操作符方法
     * obj：数据模型
     * return：从模型数据中第二位数组的模型数据
     */
    private OperatorFunction(): KeywordService {
        let obj: KeywordMode = this.mode; // 处理过后的模型
        if (obj.length > 0) {
            let value = obj.GetValue(0); // 处理第一位数组
            this.chars[this.index] = super.ModelOperator(value);
            this.index++;
        }

        this.mode.SetArr(this.chars.slice(this.index)); // 处理下一个单词
        return this;
    }
}